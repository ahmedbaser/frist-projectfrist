export type TErrorSources = {
    path: string | number;
    message: string;
   }[];

export type  TGenericErrorRespones = {
    statusCode: number;
    message: string;
    errorSources: TErrorSources; 

}


