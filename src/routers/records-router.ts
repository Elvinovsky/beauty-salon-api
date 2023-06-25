import {
    Request,
    Response,
    Router
} from "express";
import { recordsRepo } from "../repositories/records-repo";
import {
    deleteRecordValidation,
    postRecordsValidation,
    putRecordsValidation
} from "../midllewares/express-validator/records-body-validation";
import { checkForErrors } from "../midllewares/express-validator/check-errors";


export const RecordsRouter = Router()

export class RecordController {
    async getRecordsByAdmin ( req: Request, res: Response ) {
        // todo superAdminGuard
        const allRecords = await recordsRepo.getAllRecords()

        if (allRecords) {
            res.send(allRecords)
            return
        }

        res.sendStatus(500)
        return
    }

    async getRecordsByUser ( req: Request, res: Response ) {
        const recordByPhone = await recordsRepo.getRecordsByPhone(req.params.phoneNumber)

        if (recordByPhone) {
            res.send(recordByPhone)
            return
        }

        res.sendStatus(500)
        return
    }

    async updateRecordForUser ( req: Request, res: Response ) {
        const changeRecord = await recordsRepo.updateRecord(Number(req.params.phoneNumber),
            req.body?.serviceTitle,
            req.body?.dateMeeting,
            req.body?.userName,
            req.body?.instagram)

        if (changeRecord === null) {
            res.sendStatus(500)
            return
        }
        if (changeRecord) {
            res.sendStatus(204)
            return
        }
        res.sendStatus(404)// todo перед отправкой смс должна пройти валидация на существование номера в БД
        return
    }
}

//админ получает все данные о записях клиентов
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
// получение всех заказов (осуществ., и неосущ.,) определенного клиента
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
// обновление данных о записи клиента в салон, доделать логику валидации
RecordsRouter.put('/:phoneNumber',
    putRecordsValidation,
    checkForErrors,
    async( req: Request, res: Response ) => {
        const changeRecord = await recordsRepo.updateRecord(Number(req.params.phoneNumber),
            req.body?.serviceTitle,
            req.body?.dateMeeting,
            req.body?.userName,
            req.body?.instagram)

        if (changeRecord === null) {
            res.sendStatus(500)
            return
        }
        if (changeRecord) {
            res.sendStatus(204)
            return
        }
        res.sendStatus(404)// todo перед отправкой смс должна пройти валидация на существование номера в БД
        return
    })
// запись на прием
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
            res.status(201)
               .send(newRecord)
            return
        }


        res.sendStatus(500)
        return

    }) //изменение времени приема или области депиляции
RecordsRouter.put('/callback')// обратный звонок
RecordsRouter.delete('/:phoneNumber',
    deleteRecordValidation,
    checkForErrors,
    async( req: Request, res: Response ) => {

        const isDeletedRecords = await recordsRepo.deleteRecord(Number(req.params.phoneNumber),
            req.body.dateMeeting)
        if (isDeletedRecords === null) {
            res.sendStatus(500)
            return
        }

        if (isDeletedRecords) {
            res.sendStatus(204)
            return
        }
        res.sendStatus(404)
        return


    })// отмена записи на прием

