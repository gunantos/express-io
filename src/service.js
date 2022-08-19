import express from 'express'
import fs from "fs"
import path from "path"

export default class Service  {
    model = null;
    option = {limit: 10}


    async routing(io, folder) {
        const file = path.join(folder, 'index.js')
        if (fs.existsSync(file)) {
            const router = express.Router()
            const ctrl_import = await import(file)
            const ctrl_default = ctrl_import.default
            const ctrl = new ctrl_default(this.model, this.option)
            await ctrl.init(io, folder)
            router.get('/', async (req, res) => {
                ctrl.get(req, res)
            })
            router.get('/:id', async (req, res) => {
                ctrl.find(req.params.id, req, res)
            })
            router.post('/', async (req, res) => {
                ctrl.post(req, res)
            })
            router.put('/:id', async (req, res) => {
                ctrl.put(req.params.id, req, res)
            })
            router.patch('/:id', async (req, res) => {
                ctrl.patch(req.params.id, req, res)
            })
            router.delete('/:id', async (req, res) => {
                ctrl.delete(req.params.id, req, res)
            })   
            return router;
        }
        return null;
    }
}