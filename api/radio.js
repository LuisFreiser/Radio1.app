import fetch from 'node-fetch';

export default async function handler(req, res) {
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', '*');
        return res.status(200).end();
    }

    const targetUrl = "https://uk16freenew.listen2myradio.com/live.mp3?typeportmount=s1_33828_stream_518870635/";

    try {
        const response = await fetch(targetUrl, {
            method: "GET",
            headers: {
                "User-Agent": "Mozilla/5.0",
                "Accept": "*/*",
                "Referer": "https://listen2myradio.com/",
                "Origin": "https://listen2myradio.com"
            }
        });

        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`);
        }

        // Forward headers and stream
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Access-Control-Allow-Origin', '*');

        const stream = response.body;
        stream.pipe(res);

        req.on('close', () => {
            stream.destroy();
        });

    } catch (error) {
        console.error("Proxy error:", error);
        res.status(500).json({ error: error.message });
    }
}
