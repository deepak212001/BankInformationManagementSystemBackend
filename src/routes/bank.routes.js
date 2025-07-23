import { Router } from "express";
import { addBankAccount, getBankAccounts, updateBankAccount, deleteBankAccount, getAllUsersBank } from "../controllers/bank.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";

const route = Router();

route.use(verifyJWT);
route.post("/add", addBankAccount);
route.get("/", getBankAccounts);
route.put("/:accountId", updateBankAccount);
route.delete("/:accountId", deleteBankAccount);
route.get("/all", getAllUsersBank);

export default route;