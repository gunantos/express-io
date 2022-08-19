import path from "path"
import { getFiles } from '../utils/files_utils'

export default async (_path = process.cwd()) => {
    const cfg = {}
    const proses_path = path.join(_path, "src", "config")
    const files = getFiles(proses_path)
    const l = files.length
    for (let i = 0; i < l; i++) {
        var nm = files[i].replace(proses_path, '')
        const _c = await import(path.join(proses_path, nm));
        nm = nm.replace('.js', '')
        nm = nm.replace(/[\/]/g, '')
        cfg[nm] = _c.default
    }
    return cfg;
}