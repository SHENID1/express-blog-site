import Router from "express";
import cors from "cors";
import AuthMiddleware from "../middleware/authMiddleware.js";
import CategoriesController from "../Controller/categoriesController.js";
const categories_router = new Router();

categories_router.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,      //access-control-allow-credentials:true
    optionSuccessStatus:200,
}));

categories_router.post("/categories",AuthMiddleware, CategoriesController.create)
categories_router.put("/categories",AuthMiddleware, CategoriesController.update)
categories_router.delete("/categories",AuthMiddleware, CategoriesController.delete)
categories_router.get("/categories", CategoriesController.getAllCategories)


export default categories_router;