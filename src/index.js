import dotenv from "dotenv"
dotenv.config({
    path: './.env'
})

import connectDB from "./dbconnect.js"
import app from './app.js'

connectDB().then(() => {
    console.log("Database connected successfully")
    app.on("error", (error) => {
        console.log("ERR: ", error);
        throw error
    })
    app.listen(process.env.PORT || 4000, () => {
        console.log(`⚙️  Servie is running at : ${process.env.PORT}`);
    })

}).catch(err => {
    console.error("Database connection failed:", err)
})