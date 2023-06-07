import {
    Request,
    Response,
    Router
} from "express";
import { servicesRepo } from "../repositories/services-repo";
import { checkForErrors } from "../midllewares/express-validator/check-errors";
import { servicesValidation } from "../midllewares/express-validator/services-body-validation";

export const ServicesRouter = Router()

ServicesRouter.get('/service', async (req:Request, res:Response) => {
    const allServices = await servicesRepo.getServices()

    if(allServices) {
        res.send(allServices)
        return
    }

    res.sendStatus(500)
    return
})

ServicesRouter.post('/service',servicesValidation, checkForErrors, async (req:Request, res:Response) => {
    try {
        const newService = await servicesRepo.addService(req.body.title, req.body.price)
        res.status(201).send(newService)
        return
    } catch (error) {
        console.log('что то пошло не так', error)
        res.sendStatus(500)
        return
    }
})

ServicesRouter.delete('/service/:id', async (req:Request, res:Response) => {

    const result = await servicesRepo.deleteService(req.params.id)

    if(result) {
        res.sendStatus(204)
        return
    }

    res.sendStatus(500)
    return
})