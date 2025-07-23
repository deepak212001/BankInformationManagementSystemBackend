import { Router } from "express";
import { addBankAccount, getBankAccounts, updateBankAccount, deleteBankAccount, getAllUsersBank } from "../controllers/bank.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import isAdmin from "../middleware/isAdmin.middlewares.js";

const route = Router();

route.use(verifyJWT);
route.post("/add", addBankAccount);
route.get("/", getBankAccounts);
route.patch("/:accountId", updateBankAccount);
route.delete("/:accountId", deleteBankAccount);
route.get("/all", isAdmin, getAllUsersBank);

export default route;