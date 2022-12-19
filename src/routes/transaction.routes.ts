import { Router } from "express";
import TransactionController from "../controllers/transaction.controller";

const transactionRoutes = Router()

transactionRoutes.get("/", TransactionController.index)
transactionRoutes.post("/create", TransactionController.create)
transactionRoutes.put("/update/:id", TransactionController.update)
transactionRoutes.get("/:id", TransactionController.findById)
transactionRoutes.delete("/:id", TransactionController.delete)

export { transactionRoutes }