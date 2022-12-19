import express, {NextFunction, Request, Response} from "express"
import { databaseConnection } from "./config/database.connect";
import { apiRouter } from "./routes";
require('dotenv').config()
import "express-async-errors";

databaseConnection.on("error", console.log.bind(console, "Error when go to connect MongoDB"))
databaseConnection.once("open", () => {
    console.log("Connection with the mongo succeed")
})

const app = express()

app.use(express.json())
app.use(apiRouter)
app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof Error) {
            return response.status(400).json({
                message: err.message,
            });
        }

        return response.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
);


app.listen(process.env.PORT, () => `Server running on port ${process.env.PORT}`);
