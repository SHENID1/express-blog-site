import User from '../models/User.js';
import bcrypt from 'bcrypt';
import tokenService from "./token-service.js";
import UserDto from "../dtos/user-dto.js";
import ApiError from "../exceptions/api-error.js";
import Role from "../models/Role.js";

class UserService{
    async registration(login, password){
        const candidate = await User.findOne({username: login})
        if (candidate){
            throw ApiError.BadRequest("Логин уже занят")
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const userRole = await Role.findOne({value: "USER"})
        const user = await User.create({username: login, password: hashPassword, roles: userRole.value})
        const userDto = new UserDto(user);

        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: user
        }
    }

    async login(login, password) {
        const user = await User.findOne({username: login})
        if (!user){
            throw ApiError.BadRequest("Пользователь не был найден или неверный пароль")
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals){
            throw ApiError.BadRequest('Пользователь не был найден или неверный пароль')
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: user
        }
    }

    async logout(refreshToken) {
        return await tokenService.removeToken(refreshToken);
    }

    async refresh(refreshToken) {
        if (!refreshToken){
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await tokenService.findToken(refreshToken);
        // console.log(userData, tokenFromDB)
        if (!userData || !tokenFromDB){
            throw ApiError.UnauthorizedError()
        }
        const user = await User.findOne({_id: userData.id});
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }
    async getAllUsers() {
        return User.find();
    }
}
export default new UserService;