import { Request, Response, NextFunction } from 'express';
import { BadRequestParameterError } from '../lib/errors';

const validate = (schema: { query?: any, body?: any, params?: any }) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const options = {
      abortEarly: true,
      allowUnknown: true,
      // stripUnknown: true
    };

    const queryResult = schema.query ? schema.query.validate(req.query, { ...options }) : {};
    const bodyResult = schema.body ? schema.body.validate(req.body, { ...options }) : {};
    const paramsResult = schema.params ? schema.params.validate(req.params, { ...options }) : {};

    if (queryResult.error || bodyResult.error || paramsResult.error) {
      const errors = {
        ...(queryResult.error && { query: queryResult.error.details }),
        ...(bodyResult.error && { body: bodyResult.error.details }),
        ...(paramsResult.error && { params: paramsResult.error.details }),
      };
      
      return next(new BadRequestParameterError("Invalid parameters/body fields received"));
    }

    next();
  };
};

export { validate };
