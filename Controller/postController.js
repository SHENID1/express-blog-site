import Post from "../models/Post.js";
import fileService from "../service/fileService.js";


export default new class PostController {
     async Upload_Image(req, res) {
        try {
            if (!req.files.file) return res.status(400).json({message: "Image не указан"})
            const fileName = await fileService.saveFile(req.files.file)
            res.status(200).json(fileName);
        }
        catch (e) {
            console.log(e)
            return res.status(500).json(e)
        }
    }
    async Delete_Image(req, res) {
        try {
            const {fileName} = req.params;
            if (!fileName) return res.status(400).json({message: "fileName не указан"})
            fileService.deleteFile(fileName)
            res.status(200).json();
        }
        catch (e) {
            return res.status(500).json(e)
        }
    }
    async create(req, res, next) {
        try {
            const {title, urlPreview, content, categories} = req.body;

            return res.status(200).json();
        } catch (e) {
            next(e)
        }
    }
    async update(req, res, next) {
        try {
            const {} = req.body;

            return res.status(200).json();
        } catch (e) {
            next(e)
        }
    }
    async delete(req, res, next) {
        try {
            const {} = req.body;

            return res.status(200).json();
        } catch (e) {
            next(e)
        }
    }
    async getPosts(req, res, next) {
        try {
            const {} = req.body;

            return res.status(200).json();
        } catch (e) {
            next(e)
        }
    }

}
