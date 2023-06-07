import {
    Request,
    Response,
    NextFunction
} from "express";
import {
    ValidationError,
    validationResult
} from 'express-validator';

export const checkForErrors = (( req: Request, res: Response, next: NextFunction ) => {
    const errorFormatter = ( {
                                 msg,
                                 type
                             }: ValidationError ) => {
        return {
            message: msg,
            field: type
        };
    };
    const error = validationResult(req)
        .formatWith(errorFormatter);
    if (!error.isEmpty()) {
        return res.status(400)
                  .json({ errorsMessages: error.array() })
    }
    return next()
})