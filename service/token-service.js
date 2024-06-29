import jwt from "jsonwebtoken";
import Token from "../../interactive-school-map-server/mongoose_scheme/token.js";

class tokenService{
    generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {expiresIn: '1d'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {expiresIn: '14d'});
        return {
            accessToken,
            refreshToken
        }
    }
    async saveToken(userId, refreshToken){
        const tokenData = await Token.findOne({user: userId})
        if (tokenData){
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        return await Token.create({user: userId, refreshToken: refreshToken});
    }

    async removeToken(refreshToken) {
        return await Token.deleteOne({refreshToken: refreshToken});
    }
    async findToken(refreshToken) {
        return await Token.findOne({refreshToken: refreshToken});
    }

    validateAccessToken(AccessToken){
        try{
            return jwt.verify(AccessToken, process.env.JWT_ACCESS_SECRET_KEY)
        }
        catch (e) {
            return null;
        }
    }

    validateRefreshToken(refreshToken){
        try{
            return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY)
        }
        catch (e) {
            return null;
        }
    }
}
export default new tokenService;