import express from "express";
import {transactionRoutes} from "./transaction.routes"
import {userRoutes} from "./user.routes";

const apiRouter = express.Router()

apiRouter.use("/transactions", transactionRoutes)
apiRouter.use("/users", userRoutes)

export { apiRouter }

