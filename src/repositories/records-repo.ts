import { RecordModel } from "../types/record-types";
import { ServiceModel } from "../types/service-types";

export const recordsRepo = {
    async  getAllRecords() {
        try {
            return  await RecordModel.find({})
        } catch (error) {
            console.error(error)
            return null
        }
    },

    async addRecord(titleService: string,
                    name: string,
                    phoneNumber: number,
                    instagram: string | null | undefined,
    ) {
        try {
            const isRepeatSession = false // bigness
            const coupon = 10 // bigness
            const addedAt = new Date()
            const price = 100 //logic
           const  dateMeeting = new Date()
            //todo думай

            const newRecord = new RecordModel({
                titleService, price, name, phoneNumber, instagram, isRepeatSession, coupon, dateMeeting, addedAt})
            if(!newRecord){
                return null
            }
            await newRecord.save()
            return newRecord
        } catch (error) {
            console.log('услуга не добавлена', error)
            return error
        }
    },
}