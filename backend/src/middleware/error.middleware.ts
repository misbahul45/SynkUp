import { Context, Next } from "hono";
import { ZodError } from "zod";
import { errorResponse } from "../lib/respon";
import { AppError } from "../lib/error";

export const errorMiddleware = async (c:Context, next:Next) =>{
    try {
        await next();
    }catch(err){
        if (err instanceof ZodError){
            return errorResponse(c, 
                "Validation Error", 
                400, 
                err.flatten().fieldErrors
            );
        }

        if(err instanceof AppError){
            return errorResponse(c, err.message, err.statusCode);
        }

        return errorResponse(c, "Internal Server Error", 500);
    }
}