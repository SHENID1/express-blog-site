import Router from "express";
import cors from "cors";
import AuthMiddleware from "../middleware/authMiddleware.js";
import PostController from "../Controller/postController.js";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";

const post_router = new Router();
dotenv.config();

post_router.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,      //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}));
post_router.use(fileUpload({}));


post_router.get('/bytes', AuthMiddleware, PostController.getBytes)
post_router.post('/bytes', AuthMiddleware, PostController.clearBytes)
post_router.post("/post", AuthMiddleware, PostController.create)
post_router.post("/image", AuthMiddleware, PostController.Upload_Image)
post_router.post("/cert/files", AuthMiddleware, PostController.Upload_Files)
post_router.get("/cert/files", PostController.getCerts)
post_router.delete("/cert/files/:fileName", AuthMiddleware, PostController.DeleteFiles)
post_router.put("/post", AuthMiddleware, PostController.update)
post_router.delete("/post/:id", AuthMiddleware, PostController.delete)
post_router.get("/post", AuthMiddleware, PostController.getPosts)
post_router.get("/post/:id", AuthMiddleware, PostController.getPost)
post_router.post("/sendMailer", AuthMiddleware, PostController.sendMailer)
post_router.get("/all/post/:id", PostController.getFreePost)
post_router.get("/posts/categories/:id/", AuthMiddleware, PostController.getPostByCategories)
post_router.get("/all/categories/:id/:count", PostController.getFreePostByCategories)


export default post_router;
