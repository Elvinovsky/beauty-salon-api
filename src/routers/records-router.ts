import {
    Request,
    Response,
    Router
} from "express";
import { recordsRepo } from "../repositories/records-repo";
import { recordsValidation } from "../midllewares/express-validator/records-body-validation";
import { checkForErrors } from "../midllewares/express-validator/check-errors";

export const RecordsRouter = Router()

RecordsRouter.get('/',
    async( req: Request, res: Response ) => {// todo superAdminGuard
        const allRecords = await recordsRepo.getAllRecords()

        if (allRecords) {
            res.send(allRecords)
            return
        }

        res.sendStatus(500)
        return

    })

RecordsRouter.post('/',
    recordsValidation,
    checkForErrors,
    async( req: Request, res: Response ) => {
        const newRecord = await recordsRepo.addRecord(req.body.serviceTitle,
            req.body.dateMeeting,
            req.body.userName,
            req.body.phoneNumber,
            req.body?.instagram)

        if (newRecord) {
            res.send(newRecord)
            return
        }

        res.sendStatus(500)
        return

    })// запись на прием
RecordsRouter.post('/callback')// обратный звонок
RecordsRouter.put('/record')//изменение времени приема или области депиляции
RecordsRouter.delete('/record')// отмена записи на прием

