import {
    expressApp,
    mongooseLoader
} from './loaders';
import ChatController from './modules/chat/controllers/Chat.controller'
import Redis from './modules/chat/services/Redis.service';

import { SocketMiddlewares } from './middlewares/socket.middleware';
const socketMiddleware: SocketMiddlewares = new SocketMiddlewares();

import http from 'http';
import { Server } from 'socket.io';

// socket configuration
const server = new http.Server(expressApp);
export const io = new Server(server, {
    cors: {
        origin: "*",
        // methods: ["GET", "POST", "PATCH", "PUT", "DELETE"]
    }
});

io.use((socket, next) => {
    socketMiddleware.authenticate(socket, next);
});

// create a instance of chatcontroller to listen for chat events
const chatController: ChatController = new ChatController();

// create a Redis database connection
const redis: Redis = new Redis();

// load components
console.log("➡️ Starting to load components in main app")
mongooseLoader();


// https
//load various app components
// import https from 'https';
// import fs from 'fs';
// const options = {
// 	key : fs.readFileSync(''),
// 	cert : fs.readFileSync('certificate.crt')
// }
// const server = https.createServer(options, expressApp);


// get port from env else default to 3014
const port: string = process.env.PORT || "3015";

server.listen(port, () => {
    console.log(`✅  Letsdev Service is listening on port ${port}.`)
});




// io.on('connection', (socket: Socket) => {
//     console.log(socket.id);
//     io.to(socket.id).emit("message", {data: "hello"});
//     try {
//         // get id from user
//         socket.emit("give-me-uid");
//         socket.on("take-my-uid", (data: string) => {
//             // map socketId to userId
//             redis.save({ userId: data, socketId: socket.id });
//             // map userId to socketId
//             redis.saveR({ userId: data, socketId: socket.id });
//         })
//     } catch (error) {
//         throw (error);
//     }

//     // remove entry from redis user gone offline
//     socket.on('disconnect', () => {
//         // redis.delete()7
//     });
// })

