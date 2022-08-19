const fs = require("fs");
const path  = require("path");
const { getFiles }  = require("./utils/files_utils");

module.exports = async (app, io) => {
    var p = path.join(process.cwd(), 'src', 'controllers')
    var list = getFiles(p, 'js')
    for (var i in list) {
        var file = list[i]
        var basename = path.basename(file);
        var page = file.replace(p, "")
        page = page.replace(/\\/g, "/")
        page = page.replace(basename, '')
        if (basename !== null && basename !== "" && basename !== undefined) {
            file = path.join(p, page, 'service.js');
            if (fs.existsSync(file)) {
                const service = await import(file)
                var pages = '/' + page.split('/').filter(function (el) {
                    return el != null && el != ""
                }).join('/')
                const d = service.default
                const s = new d()
                const currnet_path = path.dirname(file)
                const routi = await s.routing(io, currnet_path)
                if (routi != null) {
                    app.use(pages, routi)
                }
            }
        }
    }
}