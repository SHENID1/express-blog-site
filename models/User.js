import {Schema, model} from 'mongoose';

const User = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    roles: [{ type: String, ref: 'Role' }],
})

export default model("User", User);