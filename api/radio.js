import fetch from 'node-fetch';

export default async function handler(req, res) {
    const targetUrl = "https://uk16freenew.listen2myradio.com/live.mp3?typeportmount=s1_33828_stream_518870635/";

    try {
        const response = await fetch(targetUrl, {
            method: "GET",
            headers: {
                "User-Agent": "Mozilla/5.0",
                "Accept": "audio/mpeg",
                "Connection": "keep-alive",
                "Referer": "https://listen2myradio.com/"
            }
        });

        if (!response.ok) {
            throw new Error(`Stream error: ${response.status}`);
        }

        // Headers básicos y necesarios
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Accept-Ranges', 'bytes');
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Pipe directo del stream
        return new Promise((resolve, reject) => {
            response.body.pipe(res);
            response.body.on('end', resolve);
            response.body.on('error', reject);

            // Cleanup
            req.on('close', () => {
                response.body.destroy();
                resolve();
            });
        });

    } catch (error) {
        console.error('Stream error:', error);
        res.status(500).json({ error: error.message });
    }
}
