import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js'

dotenv.config();

let port = process.env.PORT;

const app = express();

app.listen(port, () => {
    console.log("server running...");
    connectDB()
});