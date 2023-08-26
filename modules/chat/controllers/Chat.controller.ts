import { Socket } from "socket.io";
import { io } from "../../../app";
import { pool } from "../../../loaders/mongoose";

class ChatController {

    constructor(){
        this.ListenForChats();
    }
    
    async ListenForChats(): Promise<void>{
        try{
            console.log("➡️ connecting to Neon Postgres 🎉🎉");
            await pool.connect();
            console.log("➡️ started loading socket service 🎉🎉");
            io.on('connection', (socket: Socket)=>{
                socket.on('disconnect', ()=>{

                });
            })
        }catch(error: any){
            throw(error);
        }
    }
}

export default ChatController;
