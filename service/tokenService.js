import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

class TokenService {
    static generateAccessToken(id, roles) {
        const payload = {
            id,
            roles
        }
        return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "24h"})
    }
}
export default TokenService;