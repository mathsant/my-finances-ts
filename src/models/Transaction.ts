import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    amount: { type: Number, required: true },
    destinyAccount: { type: String, required: true },
}, { timestamps: true })

const Transactions = mongoose.model('transactions', transactionSchema)

export { Transactions }