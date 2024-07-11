import Categories from "../models/Categories.js";
import MailUser from "../models/MailerUser.js";


export default new class MailerController {
    async createUser(req, res, next) {
        try {
            const {email} = req.body
            const MailUserCandidate = await MailUser.findOne({email})
            if (MailUserCandidate) return res.status(400).json({error: 'Mail already exists'})
            const MailUserObject = await MailUser.create({email})
            return res.status(200).json(MailUserObject);
        } catch (e) {
            next(e)
        }
    }
    async removeUser(req, res, next) {
        try {
            const {id} = req.params;
            await MailUser.findByIdAndDelete(id);
            return res.status(200).json("Вы успешно отписались от рассылки");
        } catch (e) {
            next(e)
        }
    }
}