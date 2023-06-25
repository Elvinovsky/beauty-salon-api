import {
    Router
} from "express";

import {
    deleteRecordValidation,
    postRecordsValidation,
    putRecordsValidation
} from "../midllewares/express-validator/records-body-validation";
import { checkForErrors } from "../midllewares/express-validator/check-errors";
import {
    recordController
} from "../inversify";


export const RecordsRouter = Router()


//админ получает все данные о записях клиентов
RecordsRouter.get('/',
    recordController.getRecordsByAdmin)

// получение всех заказов (осуществ., и неосущ.,) определенного клиента
RecordsRouter.get('/:phoneNumber',
    recordController.getRecordsByUser)

// обновление данных о записи клиента в салон, доделать логику валидации.(изменение времени приема или области депиляции)
RecordsRouter.put('/:phoneNumber',
    putRecordsValidation,
    checkForErrors,
    recordController.updateRecord)

// запись на прием
RecordsRouter.post('/',
    postRecordsValidation,
    checkForErrors,
    recordController.createRecord)

RecordsRouter.post('/callback')// обратный звонок

RecordsRouter.delete('/:phoneNumber',
    deleteRecordValidation,
    checkForErrors,
    recordController.deleteRecord)// отмена записи на прием

