import { RecordModel } from "../types/record-types";

export const recordsRepo = {
    async  getAllRecords() {
        try {
            return  await RecordModel.find({})
        } catch (error) {
            console.error(error)
            return null
        }
    },

    async addRecord(serviceTitle: string,
                    dateMeeting: Date,
                    userName: string,
                    phoneNumber: number,
                    instagram?: string
    ) {
        try {
            const addedAt = new Date()

            const newRecord = new RecordModel({
                serviceTitle,
                dateMeeting,
                addedAt,
                userName,
                phoneNumber,
                instagram})

            if(!newRecord){
                return null
            }

            await newRecord.save()
            return newRecord
        } catch (error) {
            console.log('запись не добавлена', error)
            return error
        }
    },
}