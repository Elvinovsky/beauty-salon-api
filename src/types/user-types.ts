import mongoose, { Schema } from "mongoose";

type UserDBType = {
    name: string
    phoneNumber: number
    instagram: string | null
    isRepeatSession: boolean
    addedAt: Date
}

const userSchema: Schema<UserDBType> = new mongoose.Schema<UserDBType>({
    name: {type: String, required: true},
    phoneNumber: {type: Number, required: true},
    instagram: { type: String, default: null },
    isRepeatSession: {type: Boolean, required: true, default: false},
},{
    timestamps: true
})

export const UserModel = mongoose.model('users', userSchema)
