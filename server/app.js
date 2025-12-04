import express from 'express';
import connection_db from './database/connection_db.js'
import asyncHandler from './utils/asyncHandler.middleware.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { fileURLToPath } from 'url';
import path from 'path';
import 'dotenv/config'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const app = express();
app.use(express.json())

// app.use(express.static(path.join(__dirname, 'global.uploads')));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true               
}));

app.use(async (req, res, next) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  next();
});

app.use('/users.uploads',express.static(path.join(__dirname, 'users.uploads')));
app.use(cookieParser())


app.get('/', asyncHandler(async(req, res)=>{
  connection_db
}))


import authRouter from './routes/routes.js';
app.use('/api/v1/auth', authRouter)
import fileuploadrouter from './routes/fileuploadroutes.js';
app.use('/api/v1/uploads',fileuploadrouter)
import dataRoutes from './routes/data.routes.js';
app.use('/api/v1/request', dataRoutes)
import deleteRoutes from './routes/delete.routes.js';
app.use('/api/v1/delete', deleteRoutes);
import favouriteRouter from './routes/favouriteSongs.route.js';
app.use('/api/v1', favouriteRouter)
import adminRoutes from './routes/admin.routes.js';
app.use('/api/v1/admin', adminRoutes)
app.listen(3000)