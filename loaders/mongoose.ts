import mongoose from 'mongoose';
import config from '../lib/config/index';
import { Client } from 'pg';

//   for local database
const dbDetails = config.get('postgresLocal');
export const client: Client = new Client({
    ...dbDetails
});

export default async function connectToDatabase() {
    try {
        console.log(`ℹ  Attempting database connection...`);
        const { username, name, password, host, port, authSource, options } = config.get("database");
        const mongoURI = `mongodb+srv://${username}:${password}${host}/${name}?retryWrites=true&w=majority`;

        await mongoose.connect(mongoURI, options);
        console.log(`✅  MongoDB connected on database ${name}`);
    } catch (error: any) {
        console.log(`❌  Failed: Error establishing database connection`);
        console.error(error);
        process.exit(1);
    }
    try{
        console.log(`➡️ Attempting postgres connection with database => ${dbDetails.database}`)
        client.connect();
        console.log(`✅ connected to => ${dbDetails.database}`)
    }catch(error){
        throw(error);
    }
}
