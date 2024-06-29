import * as uuid from 'uuid';
import * as path from "path";
import * as fs from "fs";

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
        return getSize('eventsImage') / 2 ** 10 / 2 ** 10;
    }
    async saveFile(file){
        try{
            const fileName = uuid.v4() + ".jpg";
            const filePath = path.resolve("eventsImage", fileName)
            await file.mv(filePath)
            return fileName;
        }
        catch (e) {
            console.error(e)
        }
    }
    async updateFile(file, fileName) {
        try {
            const filePath = path.resolve("eventsImage", fileName)
            fs.rmSync(filePath);
            await file.mv(filePath)
        }
        catch (e) {
            console.error(e)
        }
    }
    deleteFile(fileName) {
        try {
            const filePath = path.resolve("eventsImage", fileName)
            fs.rmSync(filePath);
        }
       catch (e) {
           return 0;
       }
    }
}

export default new fileService();