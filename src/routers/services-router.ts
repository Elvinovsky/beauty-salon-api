import {
    Request,
    Response,
    Router
} from "express";
import { servicesRepo } from "../repositories/services-repo";
import { checkForErrors } from "../midllewares/express-validator/check-errors";
import { servicesValidation } from "../midllewares/express-validator/services-body-validation";

export const ServicesRouter = Router()

ServicesRouter.get('/', async (req:Request, res:Response) => {
    const allServices = await servicesRepo.getAllServices()

    if(allServices) {
        res.send(allServices)
        return
    }

    res.sendStatus(500)
        return
})

ServicesRouter.post('/',servicesValidation, checkForErrors, async (req:Request, res:Response) => {// todo superAdminGuard

    const newService = await servicesRepo.addService(req.body.title, req.body.price)

    if(newService) {
        res.status(201).send(newService)
        return
    }

    res.sendStatus(500)
        return

})

ServicesRouter.delete('/:id', async (req:Request, res:Response) => {

    const result = await servicesRepo.deleteService(req.params.id)

    if(result) {
        res.sendStatus(204)
        return
    }

    res.sendStatus(500)
        return
}) // todo superAdminGuard