import { Socket } from "socket.io";
import { io } from "../../../app";
import { client } from "../../../loaders/mongoose";
import Redis from "../services/Redis.service";


const redis: Redis = new Redis();

class ChatController {

    constructor() {
        this.ListenForChats();
    }

    ListenForChats() {
        try {

            io.on('connection', (socket: Socket) => {
                console.log("hello user connected");
                try {
                    // get id from user
                    socket.emit("give-me-uid");
                    socket.on("take-my-uid", (data: string) => {
                        // map socketId to userId
                        redis.save({ userId: data, socketId: socket.id });
                        // map userId to socketId
                        redis.saveR({ userId: data, socketId: socket.id });
                    })
                } catch (error) {
                    throw (error);
                }

                // remove entry from redis user gone offline
                socket.on('disconnect', () => {
                    // redis.delete()7
                });
            })
        } catch (error: any) {
            throw (error.message);
        }
    }
}

export default ChatController;
