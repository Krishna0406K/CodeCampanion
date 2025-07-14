import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import userRouter from './routes/usersRoute.js';
import ytRouter from './routes/youtubeRoute.js';
import explainRouter from './routes/explainRoute.js';
import matchRouter from './routes/matchRoute.js';
import codeForcesRouter from './routes/codeForcesRoute.js';

const app =  express();
app.use(cors());
app.use(express.json());
dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) =>{
    res.send('API is running...');
})

app.use('/api/users', userRouter);
app.use('/api/youtube', ytRouter);
app.use('/api/explain', explainRouter);
app.use('/api/match', matchRouter);
app.use('/api/problemSet', codeForcesRouter);

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
});

