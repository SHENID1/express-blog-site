import nodemailer from "nodemailer";
import dotenv from "dotenv";
import MailUser from "../models/MailerUser.js";
import Categories from "../models/Categories.js";
import dayjs from "dayjs";
import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            pool: true,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        })
    }

    async sendAllUsers(link, originUrl, data) {
        try {
            const users = JSON.parse(JSON.stringify(await MailUser.find()));
            const cat = await Categories.findById(data.catId);
            const name = cat.name;
            users.forEach(user => {
                const linkForm = `${process.env.CLIENT_URL}${link}`
                this.sendEmail(user.email, linkForm, `${originUrl}/mail/remove/${user._id}`, data, name)
            })
        } catch (e) {
            throw e;
        }

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

    async sendEmail(to, link, unsubscribe_link, data, name) {
        const imageFileName = data.urlPreview;
        const date = dayjs(data?.dateCreated).locale("ru");
        const dateSting = date.format("DD.MM.YYYY");

        const imagePath = __dirname + '/../static/' + imageFileName;
        // console.log(imagePath);

        const content = `
<div style='
                padding: 15px;
                margin: 0 auto;
                width: 100%;
                background-color: whitesmoke;
                flex-direction: column;
                align-items: center;
                font-family: Inter, Arial, sans-serif;
                color: black;
                box-sizing: border-box;
'>
    <div
            style='
           background-color: lightgray;
           max-width: 540px;
           box-sizing: border-box;
                    width: 100%;
                    height: max-content;
                    border-radius: 20px;
                    padding: 10px;
                    color: black;
                    text-decoration: none;
                    margin: auto;
                '>


        <div style='
                        height: max-content;
                    '>
            <div style='
                            font-family: Luminari, fantasy;
                            font-optical-sizing: auto;
                            font-weight: 400;
                            font-style: normal;
                            font-size: 35px;
                            margin-right: 30px;
                            margin-left: 10px;
                            color: #000000;
                            user-select: none;
                        '>
                Все Закупки
            </div>
        </div>


        <img style='
    border-radius: 20px;
    height: auto;
    width: 100%;
    max-width: 520px;
    margin-bottom: 10px;
    color: black;
    text-decoration: none;
  ' alt="" src="cid:logo"/>
        <div style='
                        width: 100%;
                        height: 100%;'
        >
            <div style='
                                font-weight: bold;
                                font-size: 20px;
                                border-radius: 5px;
                                max-width: max-content;
                                width: auto;
                                padding-left: 5px;
                                padding-right: 5px;
                                color: black;
                            '>
                ${data.title}
            </div>
            <div style='
                                margin-top: 10px;
                                padding: 5px;
                                height: max-content;
                                background-color: lightgray;
                                width: max-content;
                                border-radius: 5px;
                                color: black;
                            '>Категория: <b>${name}</b></div>
            <div style='
                                margin-top: 10px;
                                padding: 5px;
                                height: max-content;
                                background-color: lightgray;
                                width: max-content;
                                border-radius: 5px;
                                color: black;
                                margin-bottom: 10px;
                            '><b>${dateSting}</b></div>

            <a href='${link}' target="_blank"
               rel="noopener noreferrer" style="color: black; padding: 5px">
                Открыть пост
            </a>
        </div>


        <div style='
                        margin-top: 20px;
                        color: gray;
                        width: 100%;
                        max-width: 540px;
                    '>
            Если вы не хотите получать подобные информационные сообщения в будущем, нажмите <a
                rel="noopener noreferrer"
                href='${unsubscribe_link}' target="_blank">здесь</a>.
        </div>
    </div>
</div>
`
        try {
            await this.transporter.sendMail({
                to,
                from: process.env.SMTP_USER,
                subject: "Все Закупки",
                text: "",
                html: content,
                attachments: [
                    {   // utf-8 string as an attachment
                        filename: data.urlPreview,
                        path: imagePath,
                        cid: 'logo'
                    },],
            })
        } catch (e) {
            await this.transporter.sendMail({
                to,
                from: process.env.SMTP_USER,
                subject: "Все Закупки",
                text: "",
                html: content,
                attachments: [
                    {   // utf-8 string as an attachment
                        filename: data.urlPreview,
                        path: imagePath,
                        cid: 'logo'
                    },],
            })
        }
    }

}


export default new MailService();