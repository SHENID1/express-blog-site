import Router from "express";
import cors from "cors";
import AuthMiddleware from "../middleware/authMiddleware.js";
import PostController from "../Controller/postController.js";
import fileUpload from "express-fileupload";

const post_router = new Router();

post_router.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,      //access-control-allow-credentials:true
    optionSuccessStatus:200,
}));
post_router.use(fileUpload({}));

post_router.post("/post",AuthMiddleware, PostController.create)
post_router.post("/image",AuthMiddleware, PostController.Upload_Image)
post_router.delete("/image/:fileName",AuthMiddleware, PostController.Delete_Image)
post_router.put("/post",AuthMiddleware, PostController.update)
post_router.delete("/post/:id",AuthMiddleware, PostController.delete)
post_router.get("/post",AuthMiddleware, PostController.getPosts)
post_router.get("/post/:id", PostController.getPost)
post_router.get("/posts/categories/:id", PostController.getPostByCategories)


export default post_router;
