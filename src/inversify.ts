import "reflect-metadata"
import { RecordsController } from "./controllers/records-controller";
import { RecordsRepo } from "./repositories/records-repo";
import { ServicesRepo } from "./repositories/services-repo";
import { ServicesController } from "./controllers/services-controller";
import { Container } from "inversify";

export const container = new Container()

container.bind(RecordsRepo).toSelf()
container.bind(ServicesRepo).toSelf()
container.bind(ServicesController).toSelf()
container.bind(RecordsController).toSelf()

export const recordController = container.resolve(RecordsController)
export const servicesController = container.resolve(ServicesController)