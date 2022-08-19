const socketIO =require('socket.io');

module.exports = function (server) {
    return socketIO(server, {
        tranports: ['polling'],
        cors: {
            cors: {
                origin: '*'
            }
        }
    })
}