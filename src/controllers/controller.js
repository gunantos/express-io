const express = require('express');
const fs = require("fs");
const path =require("path");
const { isEmpty } =require('../utils/string_utils');
const mongoose =require('mongoose');

module.exports = class Controller {
    event= null;
    model= null;
    option = null;
    
    constructor(model, option={}) {
        this.router = express.Router();
        this.model = model;
        this.option = option;
        if (isEmpty(this.option.limit)) {
            this.option.limit = 10
        }
    }

    async init(io, currnet_path) {
        const p = path.join(currnet_path, 'event.js');
        if (fs.existsSync(p)) {
            const e = await import(p)
            this.event = new e()
            this.event.init(io)
        }
    }

    _call_event(f, data) {
        if (this.event != null) {
            if (typeof this.event[f] === 'function') {
                this.event[f](data)
            }
        }
    }
    toObjectID(id) {
        id = id.trim().toString()
        const l = id.length
        if (l > 12) {
            id = id.slice(0, 12)
        } else if (l < 12) {
            var add = ''
            for (let i = 0; i < (12 - l); i++) {
                add += '0'.toString()
            }
            id = add + id;
        }
        return mongoose.Types.ObjectId(id)
    }

    async find(id, req, res) {
        const vm = this
        this.model.findById(this.toObjectID(id), function (err, docs) {
            return vm._res('find', req, res, err, docs)
        });
    }

    async get(req, res) {
        const query = req.query
        var option = {}
        var filter = {}
        Object.keys(query).forEach(el => {
            if (el.charAt(0) == '$') {
                var n = el.slice(1)
                option[n] = query[n]
            } else {
                filter[el] = query[el]
            }
        });
        const vm = this
        this.model.find(filter, option, function (err, docs) {
            return vm._res('get', req, res, err, docs)
        })
    }

    async post(req, res) {
        var body = req.body
        if (isEmpty(body)) {
            return this._res('post', req, res, 'Data tidak boleh kosong' , null)
        }
        const vm = this
        this.model.create(body, function (err, docs) {
            return vm._res('post', req, res, err, docs)
        })
    }

    async put(id, req, res) {
        var body = req.body
        if (isEmpty(id) || isEmpty(body)) {
            return this._res('put', req, res, isEmpty(id) ? 'Tentukan id yang ingin dirubah' : 'Data tidak boleh kosong' , null)
        }
        const vm = this
        this.model.findByIdAndUpdate(this.toObjectID(id), body, { new: false }, function (err, docs) {
            return vm._res('put', req, res, err, docs)
        })
    }

    async patch(id, req, res) {
        var body = req.body
        if (isEmpty(id) || isEmpty(body)) {
            return this._res('patch', req, res, isEmpty(id) ? 'Tentukan id yang ingin dirubah' : 'Data tidak boleh kosong' , null)
        }
        const vm = this
        this.model.findByIdAndUpdate(this.toObjectID(id), body, { new: false }, function (err, docs) {
            return vm._res('patch', req, res, err, docs)
        })
    }

    async delete(id, req, res) {
        if (isEmpty(id) ) {
            return this._res('delete', req, res, 'Tentukan id yang ingin dirubah' , null)
        }
        const vm = this
        this.model.findByIdAndRemove(this.toObjectID(id), body, function (err, docs) {
            return vm._res('delete', req, res, err, docs)
        })
    }

    _res(f, req, res, err, docs) {
        this._call_event(f, { 'req': req, 'data': docs, 'error': err, 'res': res });
        if (err) {
            return this.output(res, 503, { 'status': false, 'error': err });
        }
        return this.output(res, 200, { "status": true, "data": docs });
    }

    output(res, code, data) {
        res.setHeader('Content-Type', 'application/json');
        res.status(code);
        return res.end(JSON.stringify(data));
    }
}