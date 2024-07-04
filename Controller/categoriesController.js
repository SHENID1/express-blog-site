import Categories from "../models/Categories.js";

export default new class CategoriesController {
    async create(req, res, next) {
        try {
            const {name} = req.body
            const Cat = await Categories.findOne({name})
            if (Cat) return res.status(400).json({error: 'Category already exists'})
            const CategoriesObject = await Categories.create({name})
            return res.status(200).json(CategoriesObject);
        } catch (e) {
            next(e)
        }
    }
    async update(req, res, next) {
        try {
            const {oldName, newName} = req.body;
            const oldNameCandidate = await Categories.findOne({name: oldName})
            const newNameCandidate = await Categories.findOne({name: newName})
            if (!oldNameCandidate || newNameCandidate) return res.status(400).json({error: 'Новое имя занято или старого не существует!'});
            const updatedCategories = await Categories.findByIdAndUpdate({_id: oldNameCandidate._id}, {name: newName}, {new: true})

            return res.status(200).json(updatedCategories);
        } catch (e) {
            next(e)
        }
    }
    async delete(req, res, next) {
        try {
            const {id} = req.params;
            const CategoriesObject = await Categories.findById(id)
            if (!CategoriesObject) return res.status(400).json({error: 'Category not found'})
            await Categories.findByIdAndDelete(id);
            return res.status(200).json({message: 'Category deleted'});
        } catch (e) {
            next(e)
        }
    }
    async getAllCategories(req, res, next) {
        try {
            const AllCategories = await Categories.find();
            return res.status(200).json(AllCategories);
        } catch (e) {
            next(e)
        }
    }
    async getNameById(req, res, next) {
        try {
            const {id} = req.params;
            const cat = await Categories.findById(id);
            if (!cat) return res.status(400).json({error: 'Category not found'})
            return res.status(200).json(cat.name);
        } catch (e) {
            next(e)
        }
    }

}
