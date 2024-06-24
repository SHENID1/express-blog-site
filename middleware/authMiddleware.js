import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export default function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        if (!token) res.status(403).json({message: `Пользователь не авторизован`});
        req.user = decodedData;
        next()
    } catch (err) {
        // console.error(err)
        return res.status(403).json({message: "Пользователь не авторизован"})
    }
}