import Post from "../models/Post.js";
import fileService from "../service/fileService.js";
import Categories from "../models/Categories.js";


export default new class PostController {
    async Upload_Image(req, res) {
        try {
            if (!req.files.file) return res.status(400).json({message: "Image не указан"})
            const fileName = await fileService.saveFile(req.files.file)
            res.status(200).json(fileName);
        } catch (e) {
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
        } catch (e) {
            return res.status(500).json(e)
        }
    }

    async create(req, res, next) {
        try {
            const postData = req.body;
            const PostObject = await Post.create(postData)
            return res.status(200).json(PostObject);
        } catch (e) {
            next(e)
        }
    }

    async update(req, res, next) {
        try {
           const newData = req.body;
            if (!newData._id) return res.status(400).json({error: 'Не указано _id!'});
            const updatedPosts = await Post.findByIdAndUpdate({_id: newData._id}, newData, {new: true})
            return res.status(200).json(updatedPosts);
        } catch (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            await Post.findByIdAndDelete(id);
            return res.status(200).json("OK");
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
    async getPost(req, res, next) {
        try {
            const {id} = req.params;
            const post = await Post.findById(id);
            return res.status(200).json(post);
        } catch (e) {
            next(e)
        }
    }
    async getPostByCategories(req, res, next) {
        try {
            const {id} = req.params;
            const Cat = await Categories.findById(id)
            if (!Cat) return res.status(400).json({error: 'Category is None'})
            const post = await Post.find({categories: Cat});
            return res.status(200).json(post);
        } catch (e) {
            next(e)
        }
    }

}
