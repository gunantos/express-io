import socketIO from 'socket.io';

export default (server) => {
    return socketIO(server, {
        tranports: ['polling'],
        cors: {
            cors: {
                origin: '*'
            }
        }
    })
}