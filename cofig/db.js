import mongoose from "mongoose";

export async function connectDB() {
    try {
        await mongoose.connect("mongodb+srv://romansasi63747-pgs:Romansasi63747%40@pgs.rx3tu78.mongodb.net/?appName=pgs");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
