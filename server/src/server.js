import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js'
import authRoutes from './routes/auth.route.js';
import cors from "cors";

dotenv.config();

let port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true
}))
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`server running on port ${port}`);
    connectDB();
});