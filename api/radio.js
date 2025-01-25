export default async function handler(req, res) {
    const targetUrl = "https://uk16freenew.listen2myradio.com/live.mp3?typeportmount=s1_33828_stream_518870635/";

    try {
        const response = await fetch(targetUrl, {
            method: req.method,
            headers: {
                ...req.headers,
                host: new URL(targetUrl).host, // Asegúrate de que el host sea el del servidor de radio
            },
        });

        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }

        res.status(response.status);

        // Reenvía los headers y el cuerpo de la respuesta
        response.headers.forEach((value, key) => {
            res.setHeader(key, value);
        });

        response.body.pipe(res);
    } catch (error) {
        console.error("Error en el proxy:", error);
        res.status(500).json({ error: "Error al conectar con el stream" });
    }
}
