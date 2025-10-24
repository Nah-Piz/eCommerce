import express from "express";
import cors from "cors"
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import route from "./routes/routes.js";
import ConnectDatabase from "./database/db.connection.js";

const app = express();

dotenv.config()

ConnectDatabase();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use(cookieParser())

app.use(express.json())

app.use('/api',route)

const PORT = 2424;

app.listen(PORT, () => {
    console.log(`yayi port is ${PORT}`)
})