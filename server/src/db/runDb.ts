import mongoose from "mongoose";
import * as dotenv from 'dotenv'

dotenv.config()

const dbName = process.env.DB_NAME || 'sugar'

const mongoURI = process.env.MONGO_URL || `mongodb://0.0.0.0:27017/${dbName}`

if (!mongoURI) {
    throw Error('URI undefined')
}
console.log(process.env.MONGO_URL)

export async function runDB() {
    try {
       await mongoose.connect(mongoURI)
        console.log('DB CONNECTED')
    } catch (e) {
        console.log('no connection')
        await mongoose.disconnect()
    }
}