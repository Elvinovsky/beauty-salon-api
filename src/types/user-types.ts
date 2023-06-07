import mongoose, { Schema } from "mongoose";

export type UserDBType = {
    name: string
    phoneNumber: number
    instagram: string | null
    isRepeatSession: boolean
    coupon: number | null
    addedAt: Date
}

const userSchema: Schema<UserDBType> = new mongoose.Schema<UserDBType>({
    name: {type: String, required: true},
    phoneNumber: {type: Number, required: true},
    instagram: { type: String, default: null },
    isRepeatSession: {type: Boolean, required: true, default: false},
    coupon: {type: Number, default: null}
},{
    timestamps: true
})

export const UserModel = mongoose.model('users', userSchema)
