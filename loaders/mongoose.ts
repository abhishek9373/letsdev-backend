import mongoose from 'mongoose';
import config from '../lib/config/index';

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
}
