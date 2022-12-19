import {Request, Response} from "express";
import {Users} from "../models/User";
import {IUser} from "../entities/IUser";
import R from "ramda";
import { v4 as uuid } from "uuid";

class UserController {
    public async index(request: Request, response: Response) {
        const allUsers = await Users.find({ deleted: false }).exec()
        return response.status(200).json(allUsers)
    }

    public async create(request: Request, response: Response) {
        const user: IUser = request.body

        if(R.isNil(user.name) || R.isNil(user.email)) {
            return response.json(401).json({ message: "Bad Request"})
        }

        if (user.availableValue <= 0) {
            return response.json(401).json({ message: "This value is not allowed"})
        }

        const userCreated = await Users.create({ ...user, id: uuid() });

        return response.status(201).json(userCreated)
    }

    public async addingBalanceForUser(request: Request, response: Response) {
        const idUser = request.params.id
        const { value } = request.body

        const user = await Users.findOne({ id: idUser }).exec()

        if (R.isNil(user)) {
            return response.json(404).json({ message: "User not found"})
        }

        if (value <= 0) {
            return response.json(400).json({ message: "This value is not allowed"})
        }

        await user.update({ availableValue: user.availableValue + value }).exec()

        return response.status(200).json({ "newBalance": user.availableValue + value })
    }
}

export default new UserController()