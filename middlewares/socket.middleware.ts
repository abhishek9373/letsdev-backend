import { NextFunction, Request, Response } from "express";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";

export class SocketMiddlewares {

    authenticate(socket: Socket, next: (err?: ExtendedError | undefined) => void){
        const token = socket.handshake.query?.token;
        // implement token authentication
        next();
    }
}