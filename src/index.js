const app_cfg = require('./config/app_cfg.js');
const io_cfg = require('./config/io_cfg.js');
const server_cfg = require('./config/server_cfg.js');
const config = require('./config/index.js');
const { isEmpty } = require('./utils/string_utils.js');
const router = require('./routing.js');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { createAdapter } = require('@socket.io/mongo-adapter');
dotenv.config()

module.exports = class APP {
    static #_io = null;
    static #_server = null;
    static #_app = null;
    static #_config = null;

    static get app() { return APP.#_app }
    static get io() { return APP.#_io; }
    static get server() { return APP.#_server; }
    static get config() { return APP.#_config; }

    static start() {
        APP.init().then(() => {
            router(APP.#_app, APP.#_io).then(() => {
                mongoose.connect(process.env.MONGO_DB_URL, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }, () => {
                })
                const collection = mongoose.connection.createCollection(process.env.SOCKET_IO_ADAPTER, {
                    capped: true,
                    size: 1e6
                })
                collection.then(db => APP.#_io.adapter(createAdapter(db))).catch(error => {
                    if (error.code == 48) {
                        APP.#_io.adapter(createAdapter(mongoose.connection.collection(process.env.SOCKET_IO_ADAPTER)))
                        return;
                    }
                })
                
                    APP.#_server.listen(process.env.PORT, () => {
                    console.log(`Server up and running on port ${process.env.PORT}`);
                })
            })
        })
    }

    static async init(_path = process.cwd()) {
        APP.#_config = await config(_path)
        APP.app = APP.#_config.app_cfg;
        APP.server = APP.#_config.server_cfg;
        APP.io = APP.#_config.io_cfg;
    }

    static set app(cfg = app_cfg) {
        if (isEmpty(cfg)) {
            cfg = app_cfg
        }
        APP.#_app = cfg.express;
        APP.#_app.use(cfg.cors);
        APP.#_app.use(cfg.parameter);
    }

    static set server(cfg = server_cfg) {
        if (isEmpty(cfg)) {
            cfg = server_cfg
        }
        APP.#_server = cfg(APP.#_app);
    }
    static set io(cfg = io_cfg) {
        if (isEmpty(cfg)) {
            cfg = io_cfg
        }
        APP.#_io = cfg(APP.#_server);
    }
}