import nodemailer from 'nodemailer';

function escapeHtml(text) {
    if (!text) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

    if (req.method === 'OPTIONS') { return res.status(200).end(); }
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    try {
        const { fullname, email, phone, subject, message } = req.body || {};

        if (!fullname || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please fill in all required fields (Full Name, Email, and Message).'
            });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
        }

        const emailUser = process.env.EMAIL_USER || 'sajeeshalexander@gmail.com';
        const emailPass = process.env.EMAIL_PASS;
        if (!emailPass) {
            return res.status(500).json({ success: false, message: 'Server mail configuration error.' });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: emailUser, pass: emailPass }
        });

        const safeName    = escapeHtml(fullname);
        const safeEmail   = escapeHtml(email);
        const safePhone   = escapeHtml(phone || 'Not provided');
        const safeSubject = escapeHtml(subject || 'New Portfolio Inquiry');
        const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

        await transporter.sendMail({
            from: `"${safeName} (via Portfolio)" <${emailUser}>`,
            to: emailUser,
            replyTo: email,
            subject: `[Portfolio Contact] ${safeSubject} - from ${safeName}`,
            html: `<div style="font-family:Arial;max-width:600px;margin:0 auto;background:#0b061f;color:#fff;padding:25px;border-radius:12px;border:1px solid #7b2cbf;">
                <h2 style="color:#9d4edd;border-bottom:2px solid #7b2cbf;padding-bottom:10px;">New Portfolio Message</h2>
                <p><b style="color:#c77dff">Name:</b> ${safeName}</p>
                <p><b style="color:#c77dff">Email:</b> <a href="mailto:${safeEmail}" style="color:#e0aaff">${safeEmail}</a></p>
                <p><b style="color:#c77dff">Phone:</b> ${safePhone}</p>
                <p><b style="color:#c77dff">Subject:</b> ${safeSubject}</p>
                <div style="background:#160d38;padding:15px;border-radius:8px;border-left:4px solid #9d4edd;margin-top:15px;">
                    <p style="margin:0;color:#f0f0f0">${safeMessage}</p>
                </div>
                <div style="text-align:center;margin-top:25px;">
                    <a href="mailto:${safeEmail}?subject=Re: ${encodeURIComponent(subject||'Portfolio Inquiry')}"
                       style="display:inline-block;background:linear-gradient(135deg,#7b2cbf,#9d4edd);color:#fff;text-decoration:none;padding:12px 24px;border-radius:25px;font-weight:bold;">
                        Reply to ${safeName}
                    </a>
                </div>
            </div>`
        });

        try {
            await transporter.sendMail({
                from: `"Sajeesh Alexandar" <${emailUser}>`,
                to: email,
                subject: `Thank you for contacting me, ${safeName}!`,
                html: `<div style="font-family:Arial;max-width:600px;margin:0 auto;background:#0b061f;color:#fff;padding:30px;border-radius:12px;border:1px solid #7b2cbf;">
                    <h2 style="color:#9d4edd;margin-top:0;">Sajeesh Alexandar</h2>
                    <p style="color:#c77dff;margin:0 0 20px">Web Developer</p>
                    <p>Hi <strong>${safeName}</strong>,</p>
                    <p>Thank you for reaching out through my portfolio! I've received your message about <em>"${safeSubject}"</em> and will get back to you soon.</p>
                    <div style="background:#160d38;padding:15px;border-radius:8px;border-left:4px solid #9d4edd;margin:20px 0;">
                        <p style="margin:0;font-size:13px;color:#c77dff;font-weight:bold">Your message:</p>
                        <p style="margin:5px 0 0;color:#ddd">${safeMessage}</p>
                    </div>
                    <p>Connect with me: 
                        <a href="https://github.com/Sajeeshalexandar" style="color:#c77dff">GitHub</a> |
                        <a href="https://www.linkedin.com/in/sajeeshalexandar/" style="color:#c77dff">LinkedIn</a>
                    </p>
                    <hr style="border:none;border-top:1px solid #2a1b4e;margin:20px 0">
                    <p style="font-size:12px;color:#888;text-align:center">
                        Best regards, <strong style="color:#fff">Sajeesh Alexandar</strong>
                        | <a href="mailto:${emailUser}" style="color:#9d4edd">${emailUser}</a>
                    </p>
                </div>`
            });
        } catch (autoErr) {
            console.error('Auto-reply failed:', autoErr.message);
        }

        return res.status(200).json({
            success: true,
            message: 'Thank you! Your message has been sent. A confirmation email has also been sent to your inbox.'
        });
    } catch (err) {
        console.error('Contact API error:', err);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while sending your message. Please try again later.'
        });
    }
}
