import { ServiceModel } from "../types/service-types";
import { ObjectId } from "mongodb";
import { injectable } from "inversify";

@injectable()
export class ServicesRepo {
    async getAllServices() {
       try {
           return ServiceModel.find({});
        } catch (error) {
           console.error(error)
           return null
       }

    }
    async getServiceByTitle(title: string) {
        return ServiceModel.findOne({title});
    }
    async addService(title: string, price: number) {
        try {
            const newService = new ServiceModel({ title, price })

            await newService.save()
                return newService
        } catch (error) {
            console.log('услуга не добавлена', error)
            return error
        }
    }
    async deleteService(id: string) {
        try {
            return ServiceModel.findByIdAndDelete({ _id: new ObjectId(id) })
        } catch (error) {
            console.error(error)
            return null
        }

    }

}