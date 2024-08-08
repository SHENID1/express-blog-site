import Router from "express";
import cors from "cors";
import MailerController from "../Controller/mailerController.js";
import AuthMiddleware from "../middleware/authMiddleware.js";

const mailer_router = new Router();

mailer_router.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,      //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}));

mailer_router.post("/create", MailerController.createUser)
mailer_router.get("/users", AuthMiddleware, MailerController.getUsers)
mailer_router.get("/remove/:id", MailerController.removeUser)


export default mailer_router;