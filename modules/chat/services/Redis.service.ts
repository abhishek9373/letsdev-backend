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
      const session = await client.get(userId);
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
      const session = await client.set(userId, socketId);
      return { data: true };
    } catch (error) {
      throw error;
    }
  }

  async saveR({ userId, socketId }: { userId: string, socketId: string }) {
    try {
      const session = await client.set(socketId, userId);
      return { data: true };
    } catch (error) {
      throw error;
    }
  }

  async delete({ userId }: { userId: string }) {
    try {
      const result = await client.del(userId);
      if (result === 1) {
        return { data: true };
      } else {
        return { data: false };
      }
    } catch (error) {
      throw error;
    }
  }
}

