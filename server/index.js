import express, { urlencoded } from 'express';
import {config} from 'dotenv';
import userRoutes from './routes/user.routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

config();
const port = process.env.PORT;

const app = express();

app.use(cookieParser())
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use("/user", userRoutes)

app.listen(port, () => {
    console.log(`server running successfully at port ${port}`)
})
