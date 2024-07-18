import express, { urlencoded } from 'express';
import {config} from 'dotenv';
import userRoutes from './routes/user.routes.js';

config();
const port = process.env.PORT;

const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use("/user", userRoutes)

app.listen(port, () => {
    console.log(`server running successfully at port ${port}`)
})