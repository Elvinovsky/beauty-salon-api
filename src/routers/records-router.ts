import {Request, Response, Router} from "express";
import { servicesRepo } from "../repositories/services-repo";
import { recordsRepo } from "../repositories/records-repo";

export const RecordsRouter = Router()

RecordsRouter.get('/', async ( req:Request, res:Response) => {// todo superAdminGuard
    const allRecords = await recordsRepo.getAllRecords()

    if(allRecords) {
        res.send(allRecords)
        return
    }

    res.sendStatus(500)
    return

})

RecordsRouter.post('/', async ( req:Request, res:Response) => {// todo superAdminGuard
    const newRecord = await recordsRepo.addRecord(req.body.title, req.body.name, req.body.phone, req.body.instagram )

    if(newRecord) {
        res.send(newRecord)
        return
    }

    res.sendStatus(500)
    return

})// запись на прием
RecordsRouter.post('/callback')// обратный звонок
RecordsRouter.put('/record')//изменение времени приема или области депиляции
RecordsRouter.delete('/record')// отмена записи на прием

