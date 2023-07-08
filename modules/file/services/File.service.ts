import { v4 as uuidv4 } from "uuid";
import nconf from "../../../lib/config/index";
import { BadRequestParameterError } from "../../../lib/errors/index";
import { storage } from "firebase-admin";


const firebaseAdminSdk: { [key: string]: any } = nconf.get("firebaseAdminSdk");
const bucket = storage().bucket(firebaseAdminSdk.bucketURL);

class FileService  {
  /**
   * Service to get presigned URL from requirement
   * @param requirement
   * @param module
   * @param userId
   * @returns {Promise<unknown>}
   */
  async request({ requirement, module, userId }: any) {
    try {
      if (requirement.length === 0) {
        return [];
      }

      const response: any[] = [];

      await Promise.all(
        requirement.map(async (r: any) => {
          // generate signed URL for file
          const signedData = await this.genSignedURL(r.extension);

          // Store record in database with signed URL information
          const record:any = await this.store({
            key: signedData.key,
            order: r.order || 0,
            extension: r.extension,
            module,
            name: r.name,
            userId,
          });

          response.push({
            id: record._id,
            url: signedData.url,
            key: signedData.key,
            order: r.order || 0,
            name: r.name,
            extension: r.extension || "png",
          });
        })
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async genSignedURL(extension: string) {
    try {
      const key = uuidv4();
      const file = bucket.file(`images/${key}.${extension}`);

      const options:any = {
        version: "v4",
        action: "write",
        expires: Date.now() + 15 * 60 * 1000, // 15 minutes
        contentType: `image/${extension}`,
      };

      const [url]:any = await file.getSignedUrl(options);
      const res = { key, url };

      return res;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Service to verify file ownership
   * @param userId
   * @param fileIds
   * @returns {Promise<Boolean>}
   */
  async verifyOwnership({ userId, fileIds }: any) {
    try {
      await Promise.all(
        fileIds.map(async (fileId: string) => {
          // const file = await File.findById(fileId);
          // if (file && userId.toString() !== file.userId.toString()) {
          //   throw new BadRequestParameterError("File ownership verification failed");
          // }
        })
      );

      return { data: true };
    } catch (error) {
      console.log(error);
      // Handle error
    }
  }

  /**
   * Service to store file document to database
   * @param {Object} data
   * @returns {Promise<unknown>}
   */
  async store(data: any) {
    try {
      // const fileModel = new File(data);
      // const result = await fileModel.save();
      // return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Service to get image URL
   * @param {Object} files
   * @returns {Promise<unknown>}
   */
  async getImageUrl({ files }: any) {
    try {
      const response = await Promise.all(
        files.map(async (file: any) => {
          // const detailedFile = await File.findById(file.fileId).lean();
          // const fileRef = bucket.file(`images/${detailedFile.key}.${detailedFile.extension}`);
          // const options = {
          //   action: "read",
          //   expires: "3600",
          // };
          // const [url] = await fileRef.getSignedUrl(options);
          // const res = { order: detailedFile.order, url };
          // return res;
        })
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default FileService;
