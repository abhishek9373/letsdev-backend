import {
    expressApp,
    mongooseLoader
} from './loaders';

import http from 'http';
import { Server } from 'socket.io';
// socket configuration
const server = new http.Server(expressApp);
export const io = new Server(server);

io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle other socket events here

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

//load various app components
// import https from 'https';
// import fs from 'fs';

// load components
console.log("➡️ Starting to load components in main app")
mongooseLoader();

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

