export default new class PostService {
    static CheckContent (content) {
        const types = ["image", "htmlText"]
        content.forEach((item) => {
            const sp = item.split(" ")
            if (!types.includes(sp[0])){
                return false;
            }
        })
        return true;
    }

}