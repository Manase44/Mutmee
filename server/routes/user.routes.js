import { Router } from "express";
import registerUser from "../controllers/user/register.controller.js";
const route = Router();

route
.post("/register", registerUser)

export default route;