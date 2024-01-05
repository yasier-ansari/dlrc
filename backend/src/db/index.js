import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        console.log(`${process.env.MONGODB_URI}/${DB_NAME}`);
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MONGPDB connected!! HOST: ${connection.connection.host}`);
    } catch (error) {
        console.error("MONGODB connection error", error);
        process.exit(1)
    }
}

export default connectDB