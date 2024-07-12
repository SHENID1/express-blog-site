import * as uuid from 'uuid';
import * as path from "path";
import * as fs from "fs";
import Post from "../models/Post.js";

function getSize(path){
    let size = 0;
    if(fs.statSync(path).isDirectory()){
        const files = fs.readdirSync(path);
        files.forEach(file => {
            size += getSize(path + "/" + file);
        });
    }
    else size += fs.statSync(path).size;
    return size;
}

class fileService {
     async getSizeDir() {
        return getSize('static') / 2 ** 10 / 2 ** 10;
    }
    async saveFile(file){
        try{
            const fileName = uuid.v4() + ".jpg";
            const filePath = path.resolve("static", fileName)
            await file.mv(filePath)
            return fileName;
        }
        catch (e) {
            console.error(e)
        }
    }
    async updateFile(file, fileName) {
        try {
            const filePath = path.resolve("static", fileName)
            fs.rmSync(filePath);
            await file.mv(filePath)
        }
        catch (e) {
            console.error(e)
        }
    }
    deleteFile(fileName) {
        try {
            const filePath = path.resolve("static", fileName)
            fs.rmSync(filePath);
        }
       catch (e) {
           return 0;
       }
    }
    async clearFile() {
        const posts = await Post.find()

        let ll = []
        posts.forEach((obj) => {
            ll.push(obj.urlPreview);
            obj.content.forEach(item => {
                if (item.startsWith("image")) {
                    ll.push(item.slice(6));
                }
            })
        })
        fs.readdir('./static/', (err, files) => {
            files.forEach(filename => {
              if (!ll.includes(filename)){
                  this.deleteFile(filename)
              }
            });
          });
    }
}

export default new fileService();