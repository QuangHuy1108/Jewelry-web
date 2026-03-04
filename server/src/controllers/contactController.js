const sendEmail = require('../utils/sendEmail');

const submitContactForm = async (req, res) => {
    try {
        const { name, email, phone, inquiryType, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Name, email, and message are required.' });
        }

        const htmlTemplate = `
            <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a;">
                <div style="text-align: center; margin-bottom: 40px;">
                    <h1 style="font-family: 'Georgia', serif; letter-spacing: 4px; font-weight: normal; margin: 0; font-size: 24px;">LUXE GEMS CONCIERGE</h1>
                </div>
                
                <h2 style="font-size: 16px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; border-bottom: 1px solid #eaeaea; padding-bottom: 10px; margin-bottom: 30px;">New Bespoke Inquiry</h2>
                
                <div style="font-size: 14px; font-weight: 300; line-height: 2; color: #333;">
                    <p><strong>Client Name:</strong> ${name}</p>
                    <p><strong>Email Address:</strong> <a href="mailto:${email}" style="color: #1a1a1a; text-decoration: none;">${email}</a></p>
                    <p><strong>Phone Number:</strong> ${phone || 'Not provided'}</p>
                    <p><strong>Inquiry Type:</strong> ${inquiryType || 'General Consultation'}</p>
                    <br/>
                    <p style="border-top: 1px solid #eaeaea; padding-top: 20px; margin-top: 10px;"><strong>Message:</strong></p>
                    <div style="background-color: #f9f9f9; padding: 20px; border-left: 3px solid #1a1a1a; font-style: italic;">
                        ${message.replace(/\n/g, '<br/>')}
                    </div>
                </div>

                <p style="font-size: 12px; font-weight: 300; margin-top: 50px; color: #999; text-align: center;">
                    This is an automated notification from the Luxe Gems Concierge portal.
                </p>
            </div>
        `;

        const adminEmail = process.env.ADMIN_EMAIL || 'admin@luxegems.test';

        const numSent = await sendEmail({
            email: adminEmail,
            subject: `Concierge Inquiry: ${inquiryType || 'General'} from ${name}`,
            html: htmlTemplate
        });

        if (numSent) {
            res.status(200).json({ message: 'Inquiry submitted successfully.' });
        } else {
            res.status(500).json({ message: 'There was an issue sending your inquiry. Please try again later.' });
        }
    } catch (error) {
        console.error('Contact error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    submitContactForm,
};
