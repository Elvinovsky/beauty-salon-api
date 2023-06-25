import {
    Router
} from "express";

import { checkForErrors } from "../midllewares/express-validator/check-errors";
import { servicesValidation } from "../midllewares/express-validator/services-body-validation";
import { servicesController } from "../inversify";


export const ServicesRouter = Router()

ServicesRouter.get('/',
    servicesController.getServices)

ServicesRouter.post('/',
    servicesValidation,
    checkForErrors,
    servicesController.createService)

ServicesRouter.delete('/:id',
    servicesController.deleteService) // todo superAdminGuard