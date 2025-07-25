import express from "express"
import cors from "cors"
import cookiesParser from "cookie-parser"

const app = express()
app.use(cookiesParser())

app.use(cors({
    origin: ["http://localhost:5173", "https://bank-information-management-system-opal.vercel.app"],
    credentials: true
}
))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.use(express.json({ limit: '16kb' }))
// app.use(express.json());

app.use(express.urlencoded({ extended: true, limit: "16kb" }))



app.get('/', (req, res) => {
    res.send("Welcome to the API")
})

import userRoutes from "./routes/user.routes.js"
app.use("/api/user", userRoutes);

import BankRoutes from "./routes/bank.routes.js"
app.use("/api/bank", BankRoutes);

export default app