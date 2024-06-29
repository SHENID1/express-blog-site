import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './router/authRouter.js';
import cookieParser from 'cookie-parser';


dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cookieParser())
app.use(express.json());
app.use("/auth", authRouter);


const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
    } catch (err) {
        console.log(err);
    }
}
start().then()
