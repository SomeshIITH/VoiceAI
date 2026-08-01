import express from 'express';
import morgan from 'morgan';

import {PORT} from './config/server-config.js';
import router from './routers/routes.js';
import connectDB from './config/db-config.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}))

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/',router);



app.listen(PORT,async()=>{
    console.log(`Server is running in http://localhost:${PORT}`);
    connectDB();
})

