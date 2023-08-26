import { createClient } from 'redis'
const client = createClient({
// @ts-ignore
  host: "localhost",
  port: 6379,
});
(async () => {
    console.log("➡️ Redis Connection Started 🎉🎉");
    await client.connect();
    console.log("➡️ Redis Connection Successful 🎉🎉");
})();

export default class Redis {
    constructor(){ }
//   async find({ phone }) {
//     try {
//       const session = await client.get(`${phone}`);
//       if(!session){
//         return null;
//       }
//       const sessionReturn = JSON.parse(session);
//       return sessionReturn;    
//     } catch (error) {
//       throw error;
//     }
//   }

//   async save({ phone, deviceInfo, country }) {
//     try {
//       deviceInfo.country = country;
//       const sessionString = JSON.stringify(deviceInfo);
//       const session = await client.setEx(phone,90, sessionString,);
//       return { data: true };
//     } catch (error) {
//       throw error;
//     }
//   }
}

