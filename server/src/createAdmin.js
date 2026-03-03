require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        const existingAdmin = await User.findOne({ email: 'admin@admin.com' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);

        if (existingAdmin) {
            existingAdmin.password = hashedPassword;
            existingAdmin.isAdmin = true;
            await existingAdmin.save();
            console.log('Reset admin@admin.com password to "password123" and ensured admin grants.');
        } else {
            const adminUser = new User({
                name: 'Admin User',
                email: 'admin@admin.com',
                password: hashedPassword,
                isAdmin: true
            });
            await adminUser.save();
            console.log('Created new Admin User: admin@admin.com / password123');
        }
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedAdmin();
