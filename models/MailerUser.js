import {Schema, model} from 'mongoose';

const MailUser = new Schema({
    email: {type: String, required: true, unique: true},
})

export default model("MailUser", MailUser);