import express from "express"
import { databaseConnection } from "./config/database.connect";
import { apiRouter } from "./routes";
import { errorHandling } from "./middleware/error.handling";
require('dotenv').config()
require("express-async-errors")

databaseConnection.on("error", console.log.bind(console, "Error when go to connect MongoDB"))
databaseConnection.once("open", () => {
    console.log("Connection with the mongo succeed")
})

const app = express()

app.use(express.json())
app.use(apiRouter)
app.use(errorHandling);


app.listen(process.env.PORT, () => `Server running on port ${process.env.PORT}`);
