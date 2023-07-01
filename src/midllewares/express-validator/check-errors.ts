import {
    Request,
    Response,
    NextFunction
} from "express";
import {
    Result,
    validationResult
} from 'express-validator';
import {
    ErrorMessage,
    ValidationError
} from "express-validator/src/base";

export const checkForErrors = (( req: Request, res: Response, next: NextFunction ) => {
    const errorFormatter = ( {
                                 msg,
                                 type,
                             }: ValidationError ): ErrorMessage => {

        return {
            message: msg,
            field: type
        };
    };


    const error: Result<ErrorMessage> = validationResult(req)
        .formatWith(errorFormatter);
    if (!error.isEmpty()) {
        return res.status(400)
                  .json({ errorsMessages: error.array() })
    }
    return next()
})