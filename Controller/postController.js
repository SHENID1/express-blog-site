import Post from "../models/Post.js";


export default new class PostController {
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
