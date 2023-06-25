import {
    Request,
    Response
} from "express";
import { RecordsRepo } from "../repositories/records-repo";
import {
    inject,
    injectable
} from "inversify";

@injectable()
export class RecordsController {
    constructor ( @inject(RecordsRepo) protected recordsRepo: RecordsRepo ) {
    }

    async getRecordsByAdmin ( req: Request, res: Response ) {
        // todo superAdminGuard
        const allRecords = await this.recordsRepo.getAllRecords()

        if (allRecords) {
            res.send(allRecords)
            return
        }

        res.sendStatus(500)
        return
    }

    async getRecordsByUser ( req: Request, res: Response ) {
        const recordByPhone = await this.recordsRepo.getRecordsByPhone(req.params.phoneNumber)

        if (recordByPhone) {
            res.send(recordByPhone)
            return
        }

        res.sendStatus(500)
        return
    }

    async createRecord ( req: Request, res: Response ) {
        const newRecord = await this.recordsRepo.addRecord(req.body.serviceTitle,
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

    }

    async updateRecord ( req: Request, res: Response ) {
        const changeRecord = await this.recordsRepo.updateRecord(Number(req.params.phoneNumber),
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

    async deleteRecord ( req: Request, res: Response ) {

        const isDeletedRecords = await this.recordsRepo.deleteRecord(Number(req.params.phoneNumber),
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


    }
}