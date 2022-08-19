import app_cfg from './config/app_cfg';
import io_cfg from './config/io_cfg';
import server_cfg from './config/server_cfg';
import config from './config';
import { isEmpty } from './utils/string_utils';
import router from './routing';
import dotenv from 'dotenv';

dotenv.config()

export default class APP {
    #_io = null;
    #_server = null;
    #_app = null;
    #_config = null;

    get app() { return this.#_app }
    get io() { return this.#_io; }
    get server() { return this.#_server; }
    get router() { return this.#_router; }
    get config() { return this.#_config; }

    static async start() {
        router(this.#_app, this.#_io).then(() => {
            mongoose.connect(process.env.MONGO_DB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }, (res) => {
                console.log(res)
                console.log(`DB up and running`);
            })
            const collection = mongoose.connection.createCollection(process.env.SOCKET_IO_ADAPTER, {
                capped: true,
                size: 1e6
            })
            collection.then(db => io.adapter(createAdapter(db))).catch(error => {
                if (error.code == 48) {
                    io.adapter(createAdapter(mongoose.connection.collection(process.env.SOCKET_IO_ADAPTER)))
                    return;
                }
                console.log(error)
            })
            
                global.server.listen(process.env.PORT, () => {
                console.log(`Server up and running on port ${process.env.PORT}`);
            })
        })
    }

    static async init(_path = process.cwd()) {
        this.#_config = await config(_path)
        this.app(cfg.app_cfg);
        this.server(cfg.server_cfg);
        this.io(cfg.io_cfg);
    }

    set app(cfg = app_cfg) {
        if (isEmpty(cfg)) {
            cfg = app_cfg
        }
        this.#_app = cfg.app;
        this.#_app.use(cfg.cors);
        this.#_app.use(cfg.parameter);
    }

    set server(cfg = server_cfg) {
        if (isEmpty(cfg)) {
            cfg = server_cfg
        }
        this.#_server = cfg(this.#_app);
    }
    set io(cfg = io_cfg) {
        if (isEmpty(cfg)) {
            cfg = io_cfg
        }
        this.#_io = cfg(this.#_server);
    }
}