// import { NextFunction, Response } from "express";
import { NextFunction, Response, Request } from "express";
import { io } from "../../../app";
import { IncomingChatModel, OutgoingChatModel } from "../../../interfaces/Chat.interface";
import { client } from "../../../loaders/mongoose";


class ChatController2 {

    //get initial chats
    async getChats(req: Request, res: Response, next: NextFunction){
        try{
            // let offset: any = req.query?.offset;
            const rid: any = req.query.rid;
            const sid: string = req.user._id;
            const page_size: number = 50;
            // get chats from
            const query: string = `select * from messages where ((rid='${rid}' and sid = '${sid}') or (rid='${sid}' and sid = '${rid}')) and created_at < now() order by created_at desc limit ${page_size}`;
            const response = await client.query(query);
            res.status(200).json({ data: response.rows.length > 0 ? response.rows : []});
        }catch(error){
            throw(error);
        }
    }
}

export default ChatController2;
