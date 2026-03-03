const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Primary MongoDB Connection Error: ${error.message}`);
        console.log('Spinning up temporary in-memory MongoDB for mock orders...');
        try {
            const mongoServer = await MongoMemoryServer.create();
            const mongoUri = mongoServer.getUri();
            const conn = await mongoose.connect(mongoUri);
            console.log(`In-Memory MongoDB Connected: ${conn.connection.host}`);
        } catch (memError) {
            console.error(`In-Memory MongoDB Error: ${memError.message}`);
        }
    }
};

module.exports = connectDB;
