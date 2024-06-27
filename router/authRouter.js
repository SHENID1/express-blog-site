import Router from 'express';
import AuthController from "../Controller/authController.js"
import cors from "cors";
import {check} from "express-validator";
import AuthMiddleware from "../middleware/authMiddleware.js";
import dotenv from "dotenv";

dotenv.config();
const router = new Router();
router.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,      //access-control-allow-credentials:true
    optionSuccessStatus:200,
}));

router.post("/registration",[
    check("username", "Имя пользователя не может быть пустым").notEmpty(),
    check("password", "Пароль дожен быть больше 4 и меньше 10 символов").notEmpty().isLength({min:4, max:15}),
], AuthController.registration)
router.post("/login", AuthController.login)
router.get("/users", AuthMiddleware, AuthController.getUsers)

export default router;