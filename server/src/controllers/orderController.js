const Order = require('../models/Order');
const sendEmail = require('../utils/sendEmail');

const addOrderItems = async (req, res) => {
    try {
        const { orderItems, shippingAddress, totalPrice, paymentIntentId } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: 'No order items provided' });
        }

        if (!shippingAddress || !shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.country) {
            return res.status(400).json({ message: 'Incomplete shipping address' });
        }

        if (!paymentIntentId) {
            return res.status(400).json({ message: 'Payment authorization required' });
        }

        const order = new Order({
            orderItems,
            user: req.user ? req.user._id : undefined,
            shippingAddress,
            totalPrice,
            paymentStatus: 'paid',
            isPaid: true,
            paidAt: Date.now(),
            paymentIntentId
        });

        const createdOrder = await order.save();

        // Send Confirmation Email if the user was logged in and has an email
        if (req.user && req.user.email) {
            const htmlTemplate = `
                    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a;">
                        <div style="text-align: center; margin-bottom: 40px;">
                            <h1 style="font-family: 'Georgia', serif; letter-spacing: 4px; font-weight: normal; margin: 0; font-size: 24px;">LUXE GEMS</h1>
                        </div>
                        
                        <p style="font-size: 14px; font-weight: 300; letter-spacing: 1px; color: #666; margin-bottom: 30px;">
                            Dear ${req.user.name},
                        </p>
                        
                        <p style="font-size: 18px; font-weight: 300; line-height: 1.6; margin-bottom: 40px;">
                            Thank you for your recent purchase. We are preparing your order with the utmost care. Below are the details of your exquisite selections.
                        </p>

                        <div style="border-top: 1px solid #eaeaea; border-bottom: 1px solid #eaeaea; padding: 30px 0; margin-bottom: 40px;">
                            <p style="font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #999; margin-bottom: 20px;">Order Summary - #${createdOrder._id.toString().substring(18, 24).toUpperCase()}</p>
                            
                            ${orderItems.map(item => `
                                <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                                    <span style="font-size: 14px; font-weight: 300; letter-spacing: 0.5px;">${item.qty}x ${item.name}</span>
                                    <span style="font-size: 14px; font-weight: 300; letter-spacing: 1px;">$${Number(item.price * item.qty).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                </div>
                            `).join('')}

                            <div style="display: flex; justify-content: space-between; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eaeaea;">
                                <span style="font-size: 16px; font-weight: normal; letter-spacing: 1px;">Total</span>
                                <span style="font-size: 16px; font-weight: normal; letter-spacing: 1px;">$${Number(totalPrice).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                            </div>
                        </div>

                        <p style="font-size: 12px; font-weight: 300; line-height: 1.6; color: #999; text-align: center;">
                            If you have any inquiries regarding your order, please do not hesitate to contact our concierge.
                            <br/><br/>
                            With elegance,<br/>
                            Luxe Gems
                        </p>
                    </div>
                `;

            await sendEmail({
                email: req.user.email,
                subject: 'Luxe Gems - Your Order Confirmation',
                html: htmlTemplate
            });
        }

        res.status(201).json(createdOrder);
    } catch (error) {
        console.error("ORDER CREATION ERROR:", error);
        res.status(500).json({ message: error.message });
    }
};

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name email');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addOrderItems, getMyOrders, getAllOrders };
