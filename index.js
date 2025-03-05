import express from "express";
import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import cors from "cors"
import morgan from 'morgan'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config();
connectDB();
const app = express()


// middlewares
// parses the JSON data and makes it available as JavaScript objects 
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

// routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', userRoutes)

// basic route for homepage | REST api
app.get('/', (req, res) => {
    res.send("<h1>Welcome to the backend</h1>")
})


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
})