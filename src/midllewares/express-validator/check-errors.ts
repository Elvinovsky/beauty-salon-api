import {
    Request,
    Response,
    NextFunction
} from "express";
import {
    Result,
    validationResult
} from 'express-validator';
import { FieldValidationError } from "express-validator/src/base";

export const checkForErrors = (( req: Request, res: Response, next: NextFunction ) => {
    const errorFormatter = ( {
                                 msg,
                                 path,
                             }:FieldValidationError ) => {
        return {
            message: msg,
            field: path
        };
    };



    const error: Result<{ field: string; message: any }> = validationResult(req)
        // @ts-ignore
        .formatWith(errorFormatter);
    if (!error.isEmpty()) {
        return res.status(400)
                  .json({ errorsMessages: error.array() })
    }
    return next()
})