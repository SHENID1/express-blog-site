import MailUser from "../models/MailerUser.js";
import dotenv from "dotenv";
import mailService from "../service/mailService.js";

dotenv.config();

export default new class MailerController {
    async createUser(req, res, next) {
        try {
            const {email} = req.body
            const MailUserCandidate = await MailUser.findOne({email})
            if (MailUserCandidate) return res.status(400).json({error: 'Mail already exists'})
            const MailUserObject = await MailUser.create({email})
            const uri = `${req.protocol}://${req.get('host')}`
            await mailService.sendFirstEmail(email, uri, MailUserObject)
            return res.status(200).json(MailUserObject);
        } catch (e) {
            next(e)
        }
    }
    async removeUser(req, res, next) {
        try {
            const {id} = req.params;
            await MailUser.findByIdAndDelete(id);
            res.redirect(`${process.env.CLIENT_URL}/successfulUnsubscriptionPage`);
            // return res.status(200).json("Вы успешно отписались от рассылки");
        } catch (e) {
            res.redirect(`${process.env.CLIENT_URL}/`);
            next(e)
        }
    }
}