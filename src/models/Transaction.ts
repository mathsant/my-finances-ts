import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    amount: { type: Number, required: true },
    user_id: { type: String, required: true },
    user_balance: { type: Number },
    deleted: { type: Boolean, default: false }
}, { timestamps: true })

const Transactions = mongoose.model('transactions', transactionSchema)

export { Transactions }