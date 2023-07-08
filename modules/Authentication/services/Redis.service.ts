const redis = require('redis')

const client = redis.createClient();

(async () => {
  await new Promise((resolve, reject) => {
    client.on('connect', resolve);
    client.on('error', reject);
  });
})();

class Redis {
  async find({ phone }:{phone:any}) {
    try {
      const session = await client.get(`${phone}`);
      if(!session){
        return null;
      }
      const sessionReturn = JSON.parse(session);
      return sessionReturn;    
    } catch (error) {
      throw error;
    }
  }

  async save({ phone, deviceInfo, country }:{phone:string, deviceInfo:any, country:string}) {
    try {
      deviceInfo.country = country;
      const sessionString = JSON.stringify(deviceInfo);
      const session = await client.setEx(phone,90, sessionString,);
      return { data: true };
    } catch (error) {
      throw error;
    }
  }
}

export default Redis;
