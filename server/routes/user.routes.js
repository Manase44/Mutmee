import { Router } from "express";
import registerUser from "../controllers/user/register.controller.js";
import deleteUser from "../controllers/user/delete.controller.js";
import getAllusers from "../controllers/user/getUsers.controller.js";
import getSpecificUser from "../controllers/user/getSpecificUser.controller.js";
const route = Router();

route
.get("/", getAllusers)
.get("/:id", getSpecificUser)
.post("/register", registerUser)
.delete("/:id", deleteUser)

export default route;