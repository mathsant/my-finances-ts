import mongoose from "mongoose"
require('dotenv').config()

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@development.1oqv3.mongodb.net/finances?retryWrites=true&w=majority`)

let databaseConnection = mongoose.connection;

export { databaseConnection }