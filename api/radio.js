import fetch from 'node-fetch';

export const config = {
    runtime: 'edge',
};

export default async function handler(req) {
    const targetUrl = "https://uk16freenew.listen2myradio.com/live.mp3?typeportmount=s1_33828_stream_518870635/";

    try {
        const response = await fetch(targetUrl, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Accept': '*/*',
                'Range': req.headers.get('range') || 'bytes=0-',
                'Connection': 'keep-alive',
                'Origin': 'https://listen2myradio.com',
                'Referer': 'https://listen2myradio.com/'
            }
        });

        // Usar el Runtime Edge de Vercel
        return new Response(response.body, {
            status: response.status,
            headers: {
                'Content-Type': 'audio/mpeg',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': '*',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Connection': 'keep-alive'
            }
        });

    } catch (error) {
        console.error('Stream error:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to load stream' }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }
        );
    }
}
