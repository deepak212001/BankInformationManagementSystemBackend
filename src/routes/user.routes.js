import { Router } from "express";
import { register, login, logout, loginaccess, getAllUsers } from "../controllers/auth.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import isAdmin from "../middleware/isAdmin.middlewares.js";

const route = Router();

route.post("/register", register);
route.post("/login", login);
route.post("/logout", verifyJWT, logout);
route.get("/me", verifyJWT, loginaccess);
route.get("/all", verifyJWT, isAdmin, getAllUsers);

export default route;
