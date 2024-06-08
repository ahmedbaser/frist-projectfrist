import mongoose from "mongoose";
import { TErrorSources, TGenericErrorRespones } from "../interface/error";


const handleDuplicateError = (err: any): TGenericErrorRespones => {
   
  // Extract value within double quotes usign regex  
  const match = err.message.match(/"([^"]*)"/);

  // the extracted value will be in the first captruing group
   const extractedMessage = match && match[1];
 

   const errorSources : TErrorSources = [{
    path: '',
    message: `${extractedMessage} is already exists`,
   }] 
    

    const statusCode = 400;

    return {
        statusCode,
        message: 'Invalid Id',
        errorSources,
    };
};


export default handleDuplicateError;
