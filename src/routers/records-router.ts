import {
    Request,
    Response,
    Router
} from "express";
import { recordsRepo } from "../repositories/records-repo";
import {
    postRecordsValidation,
    putRecordsValidation
} from "../midllewares/express-validator/records-body-validation";
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

RecordsRouter.get('/:phoneNumber',
    async( req: Request, res: Response ) => {
        const recordByPhone = await recordsRepo.getRecordsByPhone(req.params.phoneNumber)

        if (recordByPhone) {
            res.send(recordByPhone)
            return
        }

        res.sendStatus(500)
        return

    })

RecordsRouter.put('/:phoneNumber',
    putRecordsValidation,
    checkForErrors,
    async( req: Request, res: Response ) => {
        const changeRecord = await recordsRepo.updateRecord(Number(req.params.phoneNumber),
            req.body?.serviceTitle,
            req.body?.dateMeeting,
            req.body?.userName,
            req.body?.instagram)

        if (changeRecord) {
            res.sendStatus(204)
            return
        }

        res.sendStatus(500)
        return

    })// запись на прием
RecordsRouter.post('/',
    postRecordsValidation,
    checkForErrors,
    async( req: Request, res: Response ) => {
        const newRecord = await recordsRepo.addRecord(req.body.serviceTitle,
            req.body.dateMeeting,
            req.body.userName,
            req.body.phoneNumber,
            req.body?.instagram)

        if (newRecord) {
            res.status(201).send(newRecord)
            return
        }

        res.sendStatus(500)
        return

    })//изменение времени приема или области депиляции
RecordsRouter.put('/callback')// обратный звонок
RecordsRouter.delete('/record')// отмена записи на прием

