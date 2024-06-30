import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './router/authRouter.js';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import postRouter from "./router/postRouter.js";
import categories_router from "./router/categoriesRouter.js";


dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cookieParser())
app.use(express.json());
app.use("/auth", authRouter);
app.use("/api", postRouter);
app.use("/api", categories_router);
app.use(express.static("static"));
app.use(fileUpload({}));


const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
    } catch (err) {
        console.log(err);
    }
}
start().then()
