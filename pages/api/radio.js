const handler = async (req, res) => {
    const targetUrl = "https://uk16freenew.listen2myradio.com/live.mp3?typeportmount=s1_33828_stream_518870635/";

    // Headers CORS y de audio
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        const response = await fetch(targetUrl, {
            method: "GET",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                "Accept": "audio/mpeg",
                "Range": req.headers.range || "bytes=0-",
                "Connection": "keep-alive",
                "Referer": "https://listen2myradio.com/",
                "Origin": "https://listen2myradio.com"
            },
        });

        // Agregar log para debugging
        console.log('Stream response status:', response.status);

        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`);
        }

        // Forward status and headers
        res.statusCode = response.status;

        // Pipe the stream directly
        const stream = response.body;
        stream.pipe(res);

        // Handle stream errors
        stream.on('error', (error) => {
            console.error('Stream error:', error);
            if (!res.headersSent) {
                res.status(500).end();
            }
        });

        // Cleanup on client disconnect
        req.on('close', () => {
            stream.destroy();
        });

    } catch (error) {
        console.error("Detailed proxy error:", {
            message: error.message,
            stack: error.stack
        });

        if (!res.headersSent) {
            res.status(500).json({
                error: "Failed to connect to radio stream",
                details: error.message
            });
        }
    }
};

export default handler;
