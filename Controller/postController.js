import Post from "../models/Post.js";
import fileService from "../service/fileService.js";
import Categories from "../models/Categories.js";
import MailService from "../service/mailService.js";
import dotenv from "dotenv";
import FileService from "../service/fileService.js";

dotenv.config();

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
            if (postData.categories === "all") return res.status(400).json("Фигня запрос");
            const PostObject = await Post.create(postData);
            const uri = `${req.protocol}://${req.get('host')}`
            MailService.sendAllUsers(`/post/${PostObject._id}`, uri)
            return res.status(200).json(PostObject);
        } catch (e) {
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            const newData = req.body;
            if (!newData._id) return res.status(400).json({error: 'Не указано _id!'});
            if (newData.categories === "all") return res.status(400).json({error: 'id is not all!'});
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
            // await MailService.sendEmail("dineshgembler@gmail.com", `${process.env.CLIENT_URL}/post/`)
            return res.status(200).json(post);
        } catch (e) {
            next(e)
        }
    }
    async getFreePost(req, res, next) {
        try {
            const {id} = req.params;
            const post = await Post.findById(id);
            if (!post.isVisible) return res.status(403).json({message: "403 Нет доступа"});
            post.categories = await Categories.findById(post.categories);
            // await MailService.sendEmail("dineshgembler@gmail.com", `${process.env.CLIENT_URL}/post/`)

            return res.status(200).json(post);
        } catch (e) {
            next(e)
        }
    }

    async getPostByCategories(req, res, next) {
        try {
            const {id} = req.params;
            if (id === "all") {
                const posts = await Post.find();
                return res.status(200).json(posts);
            }

            const Cat = await Categories.findById(id)
            if (!Cat) return res.status(400).json({error: 'Category is None'})
            const post = await Post.find({categories: Cat});
            return res.status(200).json(post);
        } catch (e) {
            next(e)
        }
    }
    async getFreePostByCategories(req, res, next) {
        try {
            const {id} = req.params;
            if (id === "all") {
                const posts = await Post.find({isVisible: true});
                return res.status(200).json(posts);
            }

            const Cat = await Categories.findById(id)
            if (!Cat) return res.status(400).json({error: 'Category is None'})
            const post = await Post.find({categories: Cat, isVisible: true});
            return res.status(200).json(post);
        } catch (e) {
            next(e)
        }
    }
    async getBytes(req, res) {
        try {
            const bytes = await FileService.getSizeDir();
            res.status(200).json(bytes);
        }
        catch (e) {
            console.log(e)
            return res.status(500).json(e)
        }
    }
    async clearBytes(req, res) {
        try {
            await FileService.clearFile()
            res.status(200).json();
        }
        catch (e) {
            console.log(e)
            return res.status(500).json(e)
        }
    }
}
