import { Router } from "express";
import { register, login, logout } from "../controllers/auth.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";

const route = Router();

route.post("/register", register);
route.post("/login", login);
route.post("/logout", verifyJWT, logout);

export default route;
