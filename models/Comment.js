import {Schema, model} from 'mongoose';

const Comment = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'postId', required: true},
    content: {type: String, required: true},
    rate: {type: Number, required: true, default: 0},
    postId: {type: Schema.Types.ObjectId, ref: 'postId', required: true},
})

export default model("Comment", Comment);

// interface IComment {
//     postId: string;
//     userId: string;
//     content: string
//     rete: number;
// }