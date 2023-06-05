import {Request, Response, Router} from "express";

export const FeedbacksRouter = Router()

FeedbacksRouter.get('/price')
FeedbacksRouter.post('/callback')// обратный звонок
FeedbacksRouter.post('/record')// запись на прием
FeedbacksRouter.put('/record')//изменение времени приема или области депиляции
FeedbacksRouter.delete('/record')// отмена записи на прием

