import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
    
    try {
        const { name, email, subject, message } = req.body;
        
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '465'),
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: process.env.CONTACT_EMAIL || 'info@sardaunatechlab.xyz',
            subject: subject ? `Contact Form: ${subject}` : 'New Website Inquiry',
            text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
            html: `<h3>New Website Inquiry</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><hr/><p>${message.replace(/\n/g, '<br/>')}</p>`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ status: 'success', message: 'Inquiry sent' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Failed to send message' });
    }
}