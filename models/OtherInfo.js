import {Schema, model} from 'mongoose';

const OtherInfo = new Schema({
    name: {type: String, required: true, unique: true},
    content: {type: [String], required: true},
})

export default model("OtherInfo", OtherInfo);