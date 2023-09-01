import { QueryResult } from "pg";
import { User as UserInterface } from "../../../interfaces/User.Interface";
import { client } from "../../../loaders/mongoose";
import { User } from "../../../models";
import { ConnectionsWithInfo, RawConnection, finalConnections } from "../controllers/Chat2.controller";


class ChatService {

    async getConnectionDetails(res: Array<RawConnection>) {
        try {
            const connectionsPromises: Array<Promise<ConnectionsWithInfo>> = res.map(async (conn: RawConnection) => {
                const user_info: UserInterface = await User.findById(conn.connection_id, { name: 1 }).lean();
                const tmp_conn: ConnectionsWithInfo = { ...conn, user: user_info };
                return tmp_conn;
            });
    
            // Wait for all promises to resolve using Promise.all
            const connections: Array<ConnectionsWithInfo> = await Promise.all(connectionsPromises);
            return connections; // Return the resolved connections array
        } catch (error) {
            throw error;
        }
    }

    async getFinalConnections(userId: string, conns: Array<ConnectionsWithInfo>) {
        try {
            const connectionsPromises: Array<Promise<finalConnections>> = conns.map(async (conn: ConnectionsWithInfo) => {
                const query: string = `SELECT count(*) from notifications WHERE rid='${userId}'`;
                const countResponse: QueryResult<any> = await client.query(query);
                const tmp_conn: finalConnections = { ...conn, notifications: countResponse.rows[0].count }
                return tmp_conn;
            });
    
            // Wait for all promises to resolve using Promise.all
            const connections: Array<finalConnections> = await Promise.all(connectionsPromises);
            return connections; // Return the resolved connections array
        } catch (error) {
            throw error;
        }
    }
}

export default ChatService;
