import Router from "express";
import cors from "cors";
import AuthMiddleware from "../middleware/authMiddleware.js";
import fileUpload from "express-fileupload";
import CertController from "../Controller/certController.js"
import dotenv from "dotenv";

const cert_router = new Router();
dotenv.config();

cert_router.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,      //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}));
// cert_router.use(fileUpload({}));

cert_router.post("/cert", AuthMiddleware, CertController.Upload);
cert_router.delete("/cert/:fileName", AuthMiddleware, CertController.Delete);
cert_router.get("/cert", CertController.getCerts);


export default cert_router;