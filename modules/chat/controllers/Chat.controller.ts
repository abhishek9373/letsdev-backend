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

            io.on('connection', async (socket: any) => {
                console.log("hello user connected");
                try {
                    // add entries for userId and socketId in redis
                    await redis.save({ userId: socket.user._id, socketId: socket.id });
                } catch (error) {
                    throw (error);
                }

                // remove entry from redis user gone offline
                socket.on('disconnect', async () => {
                    // delete the entry of userId and socketId in redis
                    await redis.delete(socket.user._id);
                });
            })
        } catch (error: any) {
            throw (error.message);
        }
    }
}

export default ChatController;
