import express from "express";
import {transactionRoutes} from "./transaction.routes"

const apiRouter = express.Router()

apiRouter.use("/transactions", transactionRoutes)

export { apiRouter }

