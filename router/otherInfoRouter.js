import Router from "express";
import cors from "cors";
import AuthMiddleware from "../middleware/authMiddleware.js";
import OtherController from "../Controller/otherInfoController.js";
import fileUpload from "express-fileupload";

const other_info_router = new Router();

other_info_router.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,      //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}));
other_info_router.use(fileUpload({}));



other_info_router.put("/other", AuthMiddleware, OtherController.update)
other_info_router.post("/other", AuthMiddleware, OtherController.create)
other_info_router.delete("/other/:name", AuthMiddleware, OtherController.delete)
other_info_router.get("/other/:name", OtherController.getOtherInfoByName)
// other_info_router.post("/cert", AuthMiddleware, OtherController.Upload_Files);
// other_info_router.delete("/cert/:fileName", AuthMiddleware, OtherController.Delete);
// other_info_router.get("/cert", OtherController.getCerts);


export default other_info_router;
