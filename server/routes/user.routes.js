import { Router } from "express";
import registerUser from "../controllers/user/register.controller.js";
import deleteUser from "../controllers/user/delete.controller.js";
const route = Router();

route
.post("/register", registerUser)
.delete("/:id", deleteUser)

export default route;