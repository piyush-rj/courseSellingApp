import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.DATABASE_URI;

    if (!uri) {
    throw new Error("DATABASE_URI is not defined in the environment variables");
    }

export const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};
