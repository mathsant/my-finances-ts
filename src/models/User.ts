import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    availableValue: { type: Number, required: true },
    deleted: { type: Boolean, default: false }
}, { timestamps: true })

const Users = mongoose.model('users', userSchema)

export { Users }