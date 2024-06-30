import Router from "express";
import cors from "cors";
import AuthMiddleware from "../middleware/authMiddleware.js";
import PostController from "../Controller/postController.js";

const post_router = new Router();

post_router.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,      //access-control-allow-credentials:true
    optionSuccessStatus:200,
}));

post_router.post("/post",AuthMiddleware, PostController.create)
post_router.put("/post",AuthMiddleware, PostController.update)
post_router.delete("/post",AuthMiddleware, PostController.delete)
post_router.get("/post",AuthMiddleware, PostController.getPosts)


export default post_router;
