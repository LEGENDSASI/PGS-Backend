import mongoose from "mongoose";

export async function connectDB() {
    try {
        await mongoose.connect("mongodb+srv://prasad:prasad2005@cluster0.zd6zc.mongodb.net/pgs");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
