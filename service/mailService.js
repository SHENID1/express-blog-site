import nodemailer from "nodemailer";
import dotenv from "dotenv";

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

    async sendEmail(to, link) {
        await this.transporter.sendMail({
            to,
            from: process.env.SMTP_USER,
            subject: "Новая статья уже на сайте",
            text: "",
            html: `<div>
                <h1>Опубликована статья на сайте Все Закупки</h1>
                <a href={link}>{link}</a>
            </div>`
        })
    }

}

export default new MailService;