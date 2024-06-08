import { ZodError, ZodIssue } from "zod";
import { TErrorSources, TGenericErrorRespones } from "../interface/error";

const handelZodeError = (err: ZodError) : TGenericErrorRespones => {
    const errorSources: TErrorSources = err.issues.map((issue: ZodIssue)=> {
     return {
      path: issue?.path[issue.path.length-1],
      message: issue.message,
     };
    });
    const statusCode = 400;

   return {
    statusCode,
    message: 'Validation Error',
    errorSources,
   }
   }

 export default handelZodeError;