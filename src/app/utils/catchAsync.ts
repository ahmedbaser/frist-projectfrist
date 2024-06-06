import { NextFunction, Request, RequestHandler, Response } from "express";

// this is actualy high order function
const catchAsync = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err)=> next(err)); 
  };
  };
  
 
export default catchAsync;  