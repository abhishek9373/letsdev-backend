const {admin} = require("./auth-middleware");
const { v4: uuidv4 } = require("uuid");

export async function genSignedURL () {
  try {
    const key = uuidv4();
    const storage = admin.storage();
    const bucket = storage.bucket('gs://house-hub-91918.appspot.com');
    const file = bucket.file(`images/${key}.jpg`);

    const options = {
      version: "v4",
      action: "write",
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      contentType: "image/jpeg",
    };

    file.getSignedUrl(options,(err:any, url:any) => {
      if (err) {
        return false;
      } else {
        console.log("Signed URL:", url);
        const res = { key, url : url };
        return res;
      }
    });
  } catch (err) {
    throw err;
  }
};