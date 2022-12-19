import {Request, response, Response} from "express";
import { Transactions } from "../models/Transaction";
import { ITransaction } from "../entities/ITransaction";
import {Users} from "../models/User";
import R from "ramda";
import { v4 as uuid } from "uuid";

class TransactionController {
    public async index(req: Request, res: Response): Promise<Response> {
        const transactions = await Transactions.find({ deleted: false }).exec()

        return res.status(200).json(transactions)
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const newTransaction: ITransaction = req.body

        const user = await Users.findOne({ id: newTransaction.user_id }).exec()

        if (R.isNil(user)) {
            return res.status(400).json({ message: "This User not exists" })
        }

        if (newTransaction.amount > user.availableValue) {
            return res.status(400).json({ message: "This User dont have balance" })
        }

        if (newTransaction.amount <= 0) {
            return res.status(400).json({ message: "Wrong fields" })
        }

        await user.update({ availableValue: user.availableValue - newTransaction.amount });

        const transaction = await Transactions.create({ ...newTransaction, id: uuid(), user_balance: user.availableValue - newTransaction.amount });

        return res.status(201).json(transaction);
    }

    public async findById(req: Request, res: Response) {
        const idTransaction = req.params.id.toString()

        const transaction = await Transactions.findOne({ id: idTransaction }).exec()

        return res.status(200).json(transaction)
    }

    public async findTransactionForUser(req: Request, res: Response) {
        const idUser = req.params.user_id.toString()

        const transactions = await Transactions.find({ user_id: idUser }).exec()

        return res.status(200).json(transactions)
    }

}

export default new TransactionController()