import fetch from 'node-fetch';

export default async function handler(req, res) {
    // Configuración CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // URL directa del stream
    const targetUrl = "https://uk16freenew.listen2myradio.com/live.mp3?typeportmount=s1_33828_stream_518870635/";

    try {
        console.log('Iniciando solicitud al stream...');
        const response = await fetch(targetUrl, {
            method: "GET",
            headers: {
                "User-Agent": "Mozilla/5.0",
                "Accept": "*/*",
                "Range": req.headers.range || "bytes=0-",
                "Connection": "keep-alive",
                "Origin": "https://listen2myradio.com",
                "Referer": "https://listen2myradio.com/"
            }
        });

        console.log('Respuesta del stream:', response.status);

        if (!response.ok) {
            throw new Error(`Stream error: ${response.status}`);
        }

        // Headers básicos necesarios
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        // Pipe directo del stream
        response.body.pipe(res);

        // Manejo de cierre
        req.on('close', () => {
            response.body.destroy();
        });

    } catch (error) {
        console.error('Error en el proxy:', error);
        res.status(500).json({ error: error.message });
    }
}
