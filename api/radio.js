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

        // Establece los encabezados de la respuesta del stream
        res.setHeader("Content-Type", "audio/mpeg"); // Cambia según el formato del stream
        res.setHeader("Cache-Control", "no-cache");

        // Reenvía el contenido directamente al cliente
        response.body.pipe(res);
    } catch (error) {
        console.error("Error en el proxy:", error);
        res.status(500).json({ error: "Error al conectar con el stream de radio" });
    }
}
