import {Request, Response, Router} from "express";

export const RecordsRouter = Router()

RecordsRouter.get('/record', async ( req:Request, res:Response) => {


})
RecordsRouter.post('/callback')// обратный звонок
RecordsRouter.post('/record')// запись на прием
RecordsRouter.put('/record')//изменение времени приема или области депиляции
RecordsRouter.delete('/record')// отмена записи на прием

