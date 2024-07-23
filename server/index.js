import express, { urlencoded } from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import verifyToken from "./middlewares/auth.js";

config();
const port = process.env.PORT;

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", userRoutes);
app.use("/post", verifyToken, postRoutes);

app.listen(port, () => {
  console.log(`server running successfully at port ${port}`);
});
