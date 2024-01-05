import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from './app.js'

const environment = process.env.NODE_ENV || 'development';
const envFilePath = environment === 'development' ? './env.test' : './env.prod';

dotenv.config({
    path: './env'
});

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    })
