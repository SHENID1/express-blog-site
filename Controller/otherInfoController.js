import OtherInfo from "../models/OtherInfo.js";


export default new class OtherController {


    async create(req, res, next) {
        try {
            const data = req.body
            const obj = await OtherInfo.findOne({name: data.name})
            if (obj) return res.status(400).json({error: 'OtherInfo already exists'})
            const OthObj = await OtherInfo.create(data)
            return res.status(200).json(OthObj);
        } catch (e) {
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            const data = req.body;
            const candidate = await OtherInfo.findOne({name: data.name})
            if (!data.name || !candidate) return res.status(400).json({error: 'Не указан Name'});
            // console.log(candidate._id)
            const updatedOtherInfo = await OtherInfo.findByIdAndUpdate({_id: candidate._id}, data, {new: true})
            return res.status(200).json(updatedOtherInfo);
        } catch (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const {name} = req.params;
            const OtherInfoCandidate = await OtherInfo.findOne({name})
            if (!OtherInfoCandidate) return res.status(400).json({error: 'OtherInfo not found'})
            await OtherInfo.findByIdAndDelete(OtherInfoCandidate._id);
            return res.status(200).json({message: 'OtherInfo deleted'});
        } catch (e) {
            next(e)
        }
    }

    async getOtherInfoByName(req, res, next) {
        try {
            const {name} = req.params;
            const obj = await OtherInfo.findOne({name});
            if (!obj) return res.status(400).json({error: 'OtherInfo not found'})
            return res.status(200).json(obj);
        } catch (e) {
            next(e)
        }
    }

}
