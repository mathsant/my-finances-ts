import { Router } from "express";
import UserController from "../controllers/user.controller";

const userRoutes = Router()

userRoutes.get("/", UserController.index)
userRoutes.post("/create", UserController.create)
userRoutes.put("/adding-balance/:id", UserController.addingBalanceForUser)

export { userRoutes }