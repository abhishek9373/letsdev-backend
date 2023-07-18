import { NextFunction } from "express";
import FileService from "../services/File.service";
import { customRequest } from "../../../lib/authentication/jwt/passpost-jwt-strategy";
const { BadRequestParameterError } = require("../../../lib/errors");

const fileService = new FileService();

class FileController {
  /**
   * List all samples.
   *
   * @param {Object} req The request object.
   * @param {Object} res The response object.
   */
  async getSignedURL(req: any, res:any, next:NextFunction) {
    try {
      const { requirement, module }:{requirement:any, module:any} = req.body;
      const userId = req.user._id;

      if (!requirement.length || !module) {
        return next(new BadRequestParameterError("file module require"));
      }

      requirement.map(async (item:any) => {
        item.module = module;
        item.userId = userId;
      });

      const response:any = await fileService.request({
        requirement,
        userId,
        module,
      });
      return res.json({ data: response });
    } catch (error) {
      next(error);
    }
  }
}

export default FileController;
