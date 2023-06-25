import {
    Request,
    Response
} from "express";
import { ServicesRepo } from "../repositories/services-repo";
import {
    inject,
    injectable
} from "inversify";

@injectable()
export class ServicesController {
    constructor (@inject(ServicesRepo) protected serviceRepo: ServicesRepo) {
    }
    async getServices ( req: Request, res: Response ) {
        const allServices = await this.serviceRepo.getAllServices()

        if (allServices) {
            res.send(allServices)
            return
        }

        res.sendStatus(500)
        return
    }

    async createService ( req: Request, res: Response ) {// todo superAdminGuard

        const newService = await this.serviceRepo.addService(req.body.title,
            req.body.price)

        if (newService) {
            res.status(201)
               .send(newService)
            return
        }

        res.sendStatus(500)
        return
    }

    async deleteService ( req: Request, res: Response ) {

        const result = await this.serviceRepo.deleteService(req.params.id)

        if (result) {
            res.sendStatus(204)
            return
        }

        res.sendStatus(500)
        return
    }
}
