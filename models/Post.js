import {Schema, model} from 'mongoose';

const Post = new Schema({
    title: {type: String, required: true, unique: true},
    urlPreview: {type: String, required: true},
    isVisible: {type: Boolean, required: true},
    content: {type: [String], required: true},
    commentaries: [
            {type: Schema.Types.ObjectId, ref: 'Comment', default: []}
    ],
    categories: {type: Schema.Types.ObjectId, ref: 'Categories'},
    dateCreated: {type: Date, required: true, default: new Date()},
})

export default model("Post", Post);

// interface IPost {
//     _id: string;
//     title: string;
//     categories: string;
//     urlPreview: string;
//     content: string[];
//     commentaries: IComment[];
//     dateCreated: Date;
// }


// interface IComment {
//     postId: string;
//     userId: string;
//     content: string
//     rete: number;
// }