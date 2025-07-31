import mongoose from 'mongoose';

const dbConnect = async () => {
    try {
        const username = process.env.MONGA_DB_USERNAME;
        const password = process.env.MONGA_DB_PASSWORD;
        const connectionString = `mongodb+srv://${username}:${password}@cluster0.9kj1dy1.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Cluster0`;

        const mongoDbConnection = await mongoose.connect(connectionString);
        console.log(`✅ Database connected: ${mongoDbConnection.connection.host}`);
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        process.exit(1);
    }
};

export default dbConnect;
