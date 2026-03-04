const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    try {
        let transporter;

        // If real SMTP credentials aren't provided in .env, use Ethereal for testing
        if (process.env.SMTP_HOST && process.env.SMTP_USER) {
            transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT || 587,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            });
        } else {
            console.log('No SMTP credentials found. Generating Ethereal test account...');
            const testAccount = await nodemailer.createTestAccount();
            transporter = nodemailer.createTransport({
                host: testAccount.smtp.host,
                port: testAccount.smtp.port,
                secure: testAccount.smtp.secure,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass,
                },
            });
        }

        const message = {
            from: `${process.env.FROM_NAME || 'LUXE GEMS'} <${process.env.FROM_EMAIL || 'concierge@luxegems.test'}>`,
            to: options.email,
            subject: options.subject,
            html: options.html, // Expect highly styled HTML from the controllers
        };

        const info = await transporter.sendMail(message);

        console.log(`Email sent: ${info.messageId}`);
        // Log the preview URL if using Ethereal
        if (!process.env.SMTP_HOST) {
            console.log('🔗 EMAIL PREVIEW URL: %s', nodemailer.getTestMessageUrl(info));
        }

        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

module.exports = sendEmail;
