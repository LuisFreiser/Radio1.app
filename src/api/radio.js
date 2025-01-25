export default async function handler(req, res) {
    const targetUrl = "https://uk16freenew.listen2myradio.com/live.mp3?typeportmount=s1_33828_stream_518870635/";

    try {
        const response = await fetch(targetUrl, {
            method: req.method,
            headers: req.headers,
        });

        // Reenvía la respuesta al cliente
        response.body.pipe(res);
    } catch (error) {
        console.error("Error en el proxy:", error);
        res.status(500).json({ error: "Error al conectar con el stream" });
    }
}
