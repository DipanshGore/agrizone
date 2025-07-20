import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL)
        console.log("Conncetion to DB succcessfull..");
    } catch (error) {
        console.log("MongoDb Connection error", error.message)
    }
}