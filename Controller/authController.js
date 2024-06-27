import User from "../models/User.js";
import Role from "../models/Role.js";
import bcrypt from "bcrypt";
import TokenService from "../service/tokenService.js"
import {validationResult} from "express-validator";

class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).send({errors: errors.array()});
            }
            const {username, password} = req.body;
            if (!username || !password) {
                res.status(401).json("Не указаны поля!")
            }
            const candidate = await User.findOne({username})
            if (candidate) return res.status(400).json({message: `User already exists`})
            const hashPassword = bcrypt.hashSync(password, 7);

            const userRole = await Role.findOne({value: "USER"})
            const user = new User({username, password: hashPassword, roles: [userRole.value]})
            await user.save()
            res.json({message: `Пользователь был успешно зарегестрирован`})
        } catch (e) {
            console.log(e)
            res.status(400).json("Ошибка")
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username})
            if (!user) return res.status(400).json({message: `Пользователь ${username} не найден!`})
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: `Введен неверный пароль`})
            }
            const token = TokenService.generateAccessToken(user._id, user.roles)
            user.password = undefined;
            res.json({token: token, message: "Успешная авторизация", user: user})
        } catch (e) {
            console.log(e)
            res.status(400).json("Ошибка")
        }
    }

    async getUsers(req, res) {
        try {

            res.json("Server Worked")
        } catch (e) {
            console.log(e)
            res.status(400).json("Ошибка")
        }
    }

}
export default new AuthController()