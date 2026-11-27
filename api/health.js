export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ status: 'ok', message: 'Portfolio email service is running.' });
}
