import { createClient } from 'redis'
const client = createClient();

(async () => {
  console.log("➡️ Redis Connection Started 🎉🎉");
  await client.connect();
  console.log("➡️ Redis Connection Successful 🎉🎉");
})();

export default class Redis {
  constructor() { }
  async find({ userId }: { userId: string }) {
    try {
      const userid: string = userId.toString();
      const session = await client.get(userid);
      if (!session) {
        return null;
      }
      // const sessionReturn = JSON.parse(session);
      return session;
    } catch (error) {
      throw error;
    }
  }

  async save({ userId, socketId }: { userId: string, socketId: string }) {
    try {
      const userid: string = userId.toString();
      const socketid: string = socketId.toString();
      const session = await client.set(userid, socketid);
      return { data: true };
    } catch (error) {
      throw error;
    }
  }

  async delete(key: string) {
    try {
      const fkey: string = key.toString()
      const result = await client.del(fkey);
      if (result === 1) {
        console.log("deleted");
        return { data: true };
      } else {
        return { data: false };
      }
    } catch (error) {
      throw error;
    }
  }
}

