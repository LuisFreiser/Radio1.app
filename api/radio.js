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
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                "Accept": "audio/mpeg,*/*;q=0.8",
                "Range": req.headers.range || "bytes=0-",
                "Connection": "keep-alive",
                "Referer": "https://listen2myradio.com/",
                "Origin": "https://listen2myradio.com"
            }
        });

        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`);
        }

        // Set response headers
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Accept-Ranges', 'bytes');
        res.setHeader('Content-Length', response.headers.get('content-length'));
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        if (req.headers.range) {
            res.setHeader('Content-Range', response.headers.get('content-range'));
            res.status(206);
        } else {
            res.status(200);
        }

        // Stream the response
        const stream = response.body;
        stream.pipe(res);

        // Handle errors
        stream.on('error', (error) => {
            console.error('Stream error:', error);
            if (!res.headersSent) {
                res.status(500).end();
            }
            stream.destroy();
        });

        // Cleanup
        req.on('close', () => {
            stream.destroy();
        });

    } catch (error) {
        console.error("Proxy error:", error);
        if (!res.headersSent) {
            res.status(500).json({ error: error.message });
        }
    }
}
