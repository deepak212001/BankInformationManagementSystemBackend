import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
        console.log(`\nMongoDB connected successfully : DB Hosted: ${connection.connection.host}, DB Name: ${connection.connection.name}`);
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
}
export default connectDB;