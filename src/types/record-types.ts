import { UserDBType } from "./user-types";
import mongoose, { Schema } from "mongoose";
import { ServiceDBType } from "./service-types";

export type RecordDBTypes = {
    serviceData: ServiceDBType
    userData: {
        name: string
        phoneNumber: number
        instagram: string | null | undefined
        isRepeatSession: boolean | undefined
        coupon: number | null | undefined
    }
    dateMeeting: Date
    addedAt: Date// todo isconfirmed заказ выполнен прописать логику
}
const recordSchema: Schema<RecordDBTypes> = new mongoose.Schema<RecordDBTypes>({
    serviceData: {
        title: {type: String, required: true, unique: true},
        price: {type: Number, required: true}
    },
    userData: {
        name: {type: String, required: true},
        phoneNumber: {type: Number, required: true},
        instagram: { type: String, default: null },
        isRepeatSession: {type: Boolean, required: true, default: false},
        coupon: {type: Number, default: null}
    },
    dateMeeting: {type: Date, required: true },
    addedAt: Date}
)

export const RecordModel = mongoose.model('records', recordSchema)