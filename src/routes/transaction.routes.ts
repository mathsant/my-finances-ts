import { Router } from "express";
import TransactionController from "../controllers/transaction.controller";

const transactionRoutes = Router()

transactionRoutes.get("/", TransactionController.index)
transactionRoutes.post("/create", TransactionController.create)
transactionRoutes.get("/:id", TransactionController.findById)
transactionRoutes.get("/user/:user_id", TransactionController.findTransactionForUser)

export { transactionRoutes }