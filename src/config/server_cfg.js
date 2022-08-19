import http from 'http'
export default (app) => {
    return http.createServer(app);
}