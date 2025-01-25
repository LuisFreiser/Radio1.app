export default async function handler(req, res) {
    const targetUrl = "https://uk16freenew.listen2myradio.com/live.mp3?typeportmount=s1_33828_stream_518870635/";

    try {
        const response = await fetch(targetUrl, {
            method: "GET",
            headers: {
                "User-Agent": req.headers["user-agent"] || "Mozilla/5.0",
                Accept: "*/*",
            },
        });

        if (!response.ok) {
            throw new Error(`Error en el servidor: ${response.status}`);
        }

        // Configura los headers de la respuesta del proxy
        res.status(response.status);
        response.headers.forEach((value, key) => {
            if (key.toLowerCase() !== "transfer-encoding") {
                res.setHeader(key, value);
            }
        });

        // Pipea el cuerpo directamente
        const reader = response.body.getReader();

        const forwardStream = async () => {
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                res.write(value);
            }
            res.end();
        };

        await forwardStream();
    } catch (error) {
        console.error("Error en el proxy:", error);
        res.status(500).json({ error: "Error al conectar con el stream de radio" });
    }
}
