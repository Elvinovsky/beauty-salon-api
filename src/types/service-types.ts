import mongoose, {
    Schema
} from "mongoose";


export type ServiceDBType = {
    title: string
    price: number
}

const serviceSchema: mongoose.Schema<ServiceDBType> = new mongoose.Schema<ServiceDBType>({
    title: {type: String, required: true, unique: true},
    price: {type: Number, required: true}
})

export const ServiceModel = mongoose.model('services', serviceSchema)
