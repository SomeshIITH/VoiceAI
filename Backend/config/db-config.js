import mongoose from 'mongoose';
import { MONGODB_URL } from './server-config.js';

const connectDB = async()=>{
    try {
        await mongoose.connect(MONGODB_URL);
        console.log("DB connected");
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;