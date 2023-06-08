import {
    RecordDBTypes,
    RecordModel
} from "../types/record-types";

export const recordsRepo = {
    async getAllRecords () {
        try {
            return await RecordModel.find({})
        } catch (error) {
            console.error(error)
            return null
        }
    },

    async getRecordsByPhone ( phoneNumber: string ) {
        try {
            return await RecordModel.find({ phoneNumber })
        } catch (error) {
            console.error(error)
            return null
        }
    },

    async addRecord ( serviceTitle: string, dateMeeting: Date, userName: string, phoneNumber: number, instagram?: string ): Promise<RecordDBTypes | null> {
        try {
            const addedAt = new Date()

            const newRecord = new RecordModel({
                serviceTitle,
                dateMeeting,
                addedAt,
                userName,
                phoneNumber,
                instagram
            })

            await newRecord.save()
            return newRecord
        } catch (error) {
            console.log('запись не добавлена',
                error)
            return null
        }
    },

    async updateRecord ( phoneNumber: number, serviceTitle?: string, dateMeeting?: Date, userName?: string, instagram?: string ) {
        try {
            const addedAt = new Date()

            const changeRecord = await RecordModel.updateOne({ phoneNumber: phoneNumber },
                {
                    $set: {
                        serviceTitle,
                        dateMeeting,
                        userName,
                        instagram,
                        addedAt
                    }
                })
            return changeRecord.matchedCount === 1
        } catch (error) {
            console.log('запись не обновлена',
                error)
            return null
        }
    },
    async deleteRecord ( phoneNumber: number, dateMeeting: Date ) {
       try {
            const result = await RecordModel.deleteOne({
                phoneNumber,
                dateMeeting
            })
            return result.deletedCount === 1
        } catch (error) {
           console.log('не получилось удалить запись', error)
           return null
       }

    }
}