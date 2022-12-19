import {Request, Response} from "express";
import {Transactions} from "../models/Transaction";

class TransactionController {
    public async index(req: Request, res: Response): Promise<Response> {
        const transactions = await Transactions.find()

        return res.status(200).json(transactions)
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const newTransaction = await Transactions.create(req.body)

        return res.status(200).json(newTransaction)
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const newData = req.body
        const idTransaction = req.params.id.toString()

        const filter = { id: idTransaction }

        let doc = await Transactions.findOneAndUpdate(filter, newData, { new: true })

        return res.status(200).json(doc)
    }

    public async findById(req: Request, res: Response) {
        const idTransaction = req.params.id.toString()

        const transaction = await Transactions.findOne({ id: idTransaction }).exec()

        return res.status(200).json(transaction)
    }

    public async delete(req: Request, res: Response) {
        const idTransaction = req.params.id.toString()

        const transaction = await Transactions.findOne({ id: idTransaction }).exec()

        if(transaction != null) {
            await transaction.remove()
            return res.status(200).json({ message: "transaction removed" })
        }
        return res.send("F")
    }
}

export default new TransactionController()