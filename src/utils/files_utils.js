const fs =require("fs");
const path = require("path");

function getFiles(dir, extension = '.js', files_ = []) {
    const files = fs.readdirSync(dir)
    for (var i in files) {
        var name = path.join(dir, files[i])
       
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, extension, files_)
        } else {
            if (extension != '' && extension != null && extension != undefined) {
                var ext = path.extname(name).toLowerCase().split('.')
                ext = ext[ext.length - 1]
                extension = extension.toLowerCase().split('.')
                extension = extension[extension.length - 1]
                if (ext == extension) {
                    files_.push(name)
                }
            } else {
                files_.push(name)
            }
        }
    }
    return files_
}

module.exports = {
    getFiles
}