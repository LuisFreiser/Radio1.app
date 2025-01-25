export default async function handler(req, res) {
    const targetUrl = "https://uk16freenew.listen2myradio.com/live.mp3?typeportmount=s1_33828_stream_518870635/";

    try {
        const response = await fetch(targetUrl, {
            method: req.method,
            headers: {
                ...req.headers,
                host: new URL(targetUrl).host, // Establece el host del servidor objetivo
            },
        });

        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }

        // Reenvía los headers desde la respuesta del servidor de radio
        response.headers.forEach((value, key) => {
            res.setHeader(key, value);
        });

        // Envía el stream de datos al cliente
        const reader = response.body.getReader();
        const encoder = new TextEncoder();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            res.write(encoder.decode(value));
        }

        res.end();
    } catch (error) {
        console.error("Error en el proxy:", error);
        res.status(500).json({ error: "Error al conectar con el stream de radio" });
    }
}
