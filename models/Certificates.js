import {Schema, model} from 'mongoose';

const CertName = new Schema({
    name: {type: String, required: true, unique: true},
})

export default model("CertName", CertName);