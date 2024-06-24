import Router from 'express';
import AuthController from "../Controller/authController.js"
import {check} from "express-validator";
import AuthMiddleware from "../middleware/authMiddleware.js";

const router = new Router();

router.post("/registration",[
    check("username", "Имя пользователя не может быть пустым").notEmpty(),
    check("password", "Пароль дожен быть больше 4 и меньше 10 символов").notEmpty().isLength({min:4, max:15}),
], AuthController.registration)
router.post("/login", AuthController.login)
router.get("/users", AuthMiddleware, AuthController.getUsers)

export default router;