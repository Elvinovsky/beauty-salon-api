import "reflect-metadata"
import { Container } from "inversify";
import { RecordsController } from "./controllers/records-controller";
import { RecordsRepo } from "./repositories/records-repo";

export const container = new Container()

container.bind(RecordsRepo).toSelf()
container.bind(RecordsController).toSelf()

export const recordController = container.resolve(RecordsController)