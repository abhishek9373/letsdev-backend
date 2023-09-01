import { io } from "../../../app";
import { IncomingChatModel, OutgoingChatModel } from "../../../interfaces/Chat.interface";
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
                try {
                    // add entries for userId and socketId in redis
                    await redis.save({ userId: socket.user._id, socketId: socket.id });
                } catch (error) {
                    throw (error);
                }

                try {
                    // event to recieve chats from users
                    socket.on("chat", async (data: IncomingChatModel) =>{
                        // check if connection is available between reciever and sender
                        const connection: boolean = await this.checkConnection(data.sid, data.rid);
                        if(!connection){
                            // create connection between sender and reciever
                            await this.createConnection(data.sid, data.rid);
                        }
                        // save chat in database
                        const outChat: any = await this.saveChat(data.sid, data.rid, data.text);
                        // check if reciever is online
                        const R_ScoketId: any= await redis.find({ userId: data.rid })
                        if(!R_ScoketId){
                            // user not online
                            // save notification into database

                        }else{
                            // reciever is online send chat to reciever
                            // const chat: OutgoingChatModel = { ...outChat };
                            io.to(R_ScoketId).emit('chat-to-reciever', outChat);
                        }
                    });
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

    // create connection for sender and the reciever
    async createConnection(sid: string, rid: string){
        try{
            const query: string = `insert into connections values('${sid}', '${rid}', 'active')`;
            const res: any = await client.query(query);
            if(res.rowCount == 1){
                return true;
            }
            throw(Error("empty insertion or no insertion takes place"))
        }catch(error){
            throw(error);
        }
    }

    // check if connection is available between sender and the reciever
    async checkConnection(sid: string, rid: string){
        try{
            const query: string = `select id from connections where (u1 = '${sid}' and u2 = '${rid}') or (u1 = '${rid}' and u2 = '${sid}') limit 1`;
            const res: any = await client.query(query);
            if(res.rowCount == 1){
                return true;
            }
            return false;
        }catch(error){
            throw(error);
        }
    }

    // save chat into database
    async saveChat(sid: string, rid: string, text: string){
        try{
            const query: string = `insert into messages values('${sid}','${rid}','${text}') RETURNING id, sid, rid, text, created_at, updated_at`;
            const res: any = await client.query(query);
            if(res){
                return { id: res.rows[0].id, sid: res.rows[0].sid, rid: res.rows[0].rid, text: res.rows[0].text, created_at: res.rows[0].created_at, updated_at: res.rows[0].updated_at }
            }
            throw(Error("no record inserted!"));
        }catch(error){
            throw(error);
        }
    }
}

export default ChatController;
