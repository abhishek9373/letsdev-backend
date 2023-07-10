import {
    expressApp,
    mongooseLoader
} from './loaders';
//load various app components
import https from 'https';
import fs from 'fs';

// load components
console.log("➡️ Starting to load components in main app")
mongooseLoader();

const options = {
	key : fs.readFileSync(''),
	cert : fs.readFileSync('certificate.crt')
}

const server = https.createServer(options, expressApp);

// get port from env else default to 3014
const port: string = process.env.PORT || "3015";

server.listen(port, () =>
    console.log(`✅  Letsdev Service is listening on port ${port}.`));

