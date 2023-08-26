import mongoose from 'mongoose';
import config from '../lib/config/index';
import { Client, Pool } from 'pg';

const connectionString: string = config.get('psqlConString');
// for cloude database
// export const pool = new Pool({
//     connectionString: connectionString,
//     ssl: true
// });

// pool.connect().then(client => {
//         console.log('Connected to PostgreSQL database');
//         client.release();
//     })
//     .catch(err => {
//         console.error('Error connecting to PostgreSQL database', err);
//     });

//   for local database
const dbDetails = config.get('postgres');
export const client: Client = new Client({
    ...dbDetails,
    ssl: true
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
        client.connect();
    }catch(error){
        throw(error);
    }
}
