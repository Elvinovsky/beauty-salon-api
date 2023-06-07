import { ServiceModel } from "../types/service-types";

export const servicesRepo = {
    async getServices() {
       try {
            return ServiceModel.find({});
        } catch (error) {
           console.error(error)
           return null
       }

    },
    async getServiceByTitle(title: string) {
        return ServiceModel.findOne({title});
    },
    async addService(title: string, price: number) {
        try {
            const newService = new ServiceModel({ title, price })
            if(!newService){
                return null
            }
            await newService.save()
                return newService
        } catch (error) {
            console.log('услуга не добавлена', error)
            return error
        }
    },
    async deleteService(id: string) {
        try {
            return ServiceModel.findByIdAndDelete({id: id})
        } catch (error) {
            console.error(error)
            return null
        }

    },

}