const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static portfolio files directly from root
app.use(express.static(path.join(__dirname)));

// Configure Nodemailer transporter for Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verify SMTP configuration on startup
transporter.verify((error, success) => {
    if (error) {
        console.error('SMTP configuration error:', error);
    } else {
        console.log('Mail server is ready to send messages.');
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Portfolio email service is running smoothly.' });
});

// Helper to escape HTML characters in user input
function escapeHtml(text) {
    if (!text) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { fullname, email, phone, subject, message } = req.body;

        // Basic validation
        if (!fullname || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please fill in all required fields (Full Name, Email, and Message).'
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address.'
            });
        }

        const safeName = escapeHtml(fullname);
        const safeEmail = escapeHtml(email);
        const safePhone = escapeHtml(phone || 'Not provided');
        const safeSubject = escapeHtml(subject || 'New Portfolio Inquiry');
        const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

        // 1. Email notification to Sajeesh
        const notificationMailOptions = {
            from: `"${safeName} (via Portfolio)" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `[Portfolio Contact] ${safeSubject} - from ${safeName}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b061f; color: #ffffff; padding: 25px; border-radius: 12px; border: 1px solid #7b2cbf;">
                    <h2 style="color: #9d4edd; border-bottom: 2px solid #7b2cbf; padding-bottom: 10px; margin-top: 0;">New Message from Portfolio</h2>
                    
                    <table style="width: 100%; border-collapse: collapse; margin-top: 15px; color: #ffffff;">
                        <tr>
                            <td style="padding: 8px 0; color: #c77dff; font-weight: bold; width: 120px;">Name:</td>
                            <td style="padding: 8px 0;">${safeName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #c77dff; font-weight: bold;">Email:</td>
                            <td style="padding: 8px 0;"><a href="mailto:${safeEmail}" style="color: #e0aaff; text-decoration: underline;">${safeEmail}</a></td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #c77dff; font-weight: bold;">Phone:</td>
                            <td style="padding: 8px 0;">${safePhone}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #c77dff; font-weight: bold;">Subject:</td>
                            <td style="padding: 8px 0;">${safeSubject}</td>
                        </tr>
                    </table>

                    <div style="margin-top: 20px; background-color: #160d38; padding: 15px; border-radius: 8px; border-left: 4px solid #9d4edd;">
                        <h4 style="margin: 0 0 10px 0; color: #c77dff;">Message:</h4>
                        <p style="margin: 0; line-height: 1.6; white-space: pre-wrap; color: #f0f0f0;">${safeMessage}</p>
                    </div>

                    <div style="margin-top: 25px; text-align: center;">
                        <a href="mailto:${safeEmail}?subject=Re: ${encodeURIComponent(subject || 'Portfolio Inquiry')}" 
                           style="display: inline-block; background: linear-gradient(135deg, #7b2cbf, #9d4edd); color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 25px; font-weight: bold;">
                           Reply to ${safeName}
                        </a>
                    </div>
                </div>
            `
        };

        // 2. Thank you / confirmation email to the visitor
        const autoReplyMailOptions = {
            from: `"Sajeesh Alexandar" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Thank you for contacting me, ${safeName}!`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b061f; color: #ffffff; padding: 30px; border-radius: 12px; border: 1px solid #7b2cbf;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h2 style="color: #9d4edd; margin: 0;">Sajeesh Alexandar</h2>
                        <p style="color: #c77dff; margin: 5px 0 0 0; font-size: 14px;">Web Developer & Designer</p>
                    </div>

                    <p style="font-size: 16px; line-height: 1.6; color: #f0f0f0;">Hi <strong>${safeName}</strong>,</p>

                    <p style="font-size: 15px; line-height: 1.6; color: #f0f0f0;">
                        Thank you for reaching out through my portfolio website! I have received your message regarding <em>"${safeSubject}"</em> and will review it and get back to you as soon as possible.
                    </p>

                    <div style="margin: 20px 0; background-color: #160d38; padding: 15px; border-radius: 8px; border-left: 4px solid #9d4edd;">
                        <p style="margin: 0 0 8px 0; font-size: 13px; color: #c77dff; font-weight: bold;">Summary of your message:</p>
                        <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #dddddd;">${safeMessage}</p>
                    </div>

                    <p style="font-size: 15px; line-height: 1.6; color: #f0f0f0;">
                        In the meantime, feel free to check out my latest work and connect with me on social platforms:
                    </p>

                    <div style="margin: 20px 0; text-align: center;">
                        <a href="https://github.com/Sajeeshalexandar" style="color: #c77dff; margin: 0 10px; text-decoration: none; font-weight: bold;">GitHub</a> |
                        <a href="https://www.linkedin.com/in/sajeeshalexandar/" style="color: #c77dff; margin: 0 10px; text-decoration: none; font-weight: bold;">LinkedIn</a> |
                        <a href="https://x.com/a_sajeesh69241" style="color: #c77dff; margin: 0 10px; text-decoration: none; font-weight: bold;">Twitter / X</a>
                    </div>

                    <hr style="border: none; border-top: 1px solid #2a1b4e; margin: 25px 0;">

                    <p style="font-size: 13px; color: #a0a0a0; text-align: center; margin: 0;">
                        Best regards,<br>
                        <strong style="color: #ffffff;">Sajeesh Alexandar</strong><br>
                        Web Developer<br>
                        <a href="mailto:${process.env.EMAIL_USER}" style="color: #9d4edd; text-decoration: none;">${process.env.EMAIL_USER}</a>
                    </p>
                </div>
            `
        };

        // Send notification to Sajeesh first
        await transporter.sendMail(notificationMailOptions);

        // Send thank-you auto-reply to the visitor
        try {
            await transporter.sendMail(autoReplyMailOptions);
        } catch (autoReplyErr) {
            console.error('Auto-reply failed to send to user:', autoReplyErr);
            // Non-fatal if the visitor email has delivery issues, since Sajeesh still received it
        }

        return res.status(200).json({
            success: true,
            message: 'Thank you! Your message has been sent successfully. A confirmation email has also been sent to your inbox.'
        });

    } catch (err) {
        console.error('Error handling contact form:', err);
        return res.status(500).json({
            success: false,
            message: 'Sorry, there was an error sending your message. Please try again later or contact me directly at sajeeshalexander@gmail.com.'
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
