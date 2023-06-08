import mongoose, { Schema } from "mongoose";


export type RecordDBTypes = {
    serviceTitle: string
    userName: string
    phoneNumber: number
    dateMeeting: Date
    addedAt: Date // todo isconfirmed заказ выполнен прописать логику
    instagram?: string
}
const recordSchema: Schema<RecordDBTypes> = new mongoose.Schema<RecordDBTypes>({
    serviceTitle: {type: String},
    dateMeeting: {type: Date, required: true },
    addedAt: {type: Date, required: true },
    userName: {type: String, required: true},
    phoneNumber: {type: Number, required: true},
    instagram: { type: String, default: null },

})

export const RecordModel = mongoose.model('records', recordSchema)