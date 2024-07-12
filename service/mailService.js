import nodemailer from "nodemailer";
import dotenv from "dotenv";
import MailUser from "../models/MailerUser.js";

dotenv.config();

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.yandex.ru",
            port: 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        })
    }
    async sendAllUsers(link, originUrl) {
        const users = JSON.parse(JSON.stringify(await MailUser.find()));
        users.forEach(user => {
            console.log(user)
            const linkForm = `${process.env.CLIENT_URL}${link}`
            this.sendEmail(user.email, linkForm, `${originUrl}/remove/${user._id}`)
        })
    }
    async sendFirstEmail(to, originUrl, user) {
        await this.transporter.sendMail({
            to,
            from: process.env.SMTP_USER,
            subject: "Все Закупки",
            text: "",
            html: `<div>
                <h1>Спасибо за подписку на получение новых постов для сайта Все Закупки</h1>
                Если это были не вы, то вы можете отказаться от рассылки перейдя по ссылке ниже:
                <a href="${originUrl}/mail/remove/${user._id}">отписаться от рассылки</a>
            </div>
            `
        })
    }
    async sendEmail(to, link, unsubscribe_link) {
        await this.transporter.sendMail({
            to,
            from: process.env.SMTP_USER,
            subject: "Все Закупки",
            text: "",
            html: `<div>
                <h1>Опубликована статья на сайте Все Закупки</h1>
                
                <a href="${link}">Открыть пост</a><br/>
                <a href="${unsubscribe_link}">отписаться от рассылки</a>
                
            </div>`
        })
    }

}

export default new MailService;