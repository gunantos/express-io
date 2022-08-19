import dotenv from 'dotenv'
dotenv.config()

const DB_URL = `${process.env.MONGO_DB_URL}/${process.env.MONGO_DB_DBNAME}?authSource=admin&readPreference=primary&directConnection=true&ssl=false`;
const PORT = process.env.PORT;
const SOCKET_IO_ADAPTER = process.env.SOCKET_IO_ADAPTER;

export {
  DB_URL,
    PORT,
  SOCKET_IO_ADAPTER
}