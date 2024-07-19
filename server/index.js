import express, { urlencoded } from 'express';
import {config} from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';
import postRoutes from './routes/post.routes.js';


config();
const port = process.env.PORT;

const app = express();

app.use(cookieParser())
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use("/user", userRoutes);
app.use("/post", postRoutes);

app.listen(port, () => {
    console.log(`server running successfully at port ${port}`)
})
