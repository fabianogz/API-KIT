import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { ApiResponseBuilder } from '../utils/response';

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      const errorMessage = error.details.map((detail: any) => detail.message).join(', ');
      res.status(400).json(
        ApiResponseBuilder.error('Validation failed', errorMessage)
      );
      return;
    }
    
    next();
  };
};
