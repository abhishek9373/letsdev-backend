const redis = require('redis')

const client = redis.createClient();

(async () => {
  await new Promise((resolve, reject) => {
    client.on('connect', resolve);
    client.on('error', reject);
  });
})();

class Redis {
  async find({ userId }:{ userId: string }) {
    try {
      const session = await client.get(userId);
      if(!session){
        return null;
      }
      // const sessionReturn = JSON.parse(session);
      return session;    
    } catch (error) {
      throw error;
    }
  }

  async save({ userId, socketId }:{ userId: string, socketId: string }) {
    try {
      const session = await client.set(userId, socketId,);
      return { data: true };
    } catch (error) {
      throw error;
    }
  }
}

export default Redis;
