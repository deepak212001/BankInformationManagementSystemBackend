import express from "express"
import cors from "cors"
import cookiesParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true
}
))

    app.use(express.json({ limit: '16kb' }))
// app.use(express.json());

app.use(express.urlencoded({ extended: true, limit: "16kb" }))

app.use(cookiesParser())

app.get('/', (req, res) => {
        res.send("Welcome to the API")
    })

import userRoutes from "./routes/user.routes.js"
app.use("/api/user", userRoutes);

import BankRoutes from "./routes/bank.routes.js"
app.use("/api/bank", BankRoutes);

export default app