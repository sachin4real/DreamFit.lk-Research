import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js';


import cartRoutes from './routes/Cart_route.js';  
import cardRoutes from './routes/card.route.js'; 
import deliveryRoutes from './routes/Delivery_route.js';

import clothesProductRoutes from './routes/clothesProductRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

import cors from 'cors';

dotenv.config();

mongoose.connect(
    process.env.MONGODB
)
.then(()=> {
    console.log('MongoDb is connected');
}).catch((err)=>{
    console.log(err);
});

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

// Static folder for uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static('uploads'));  // Serve images from the 'uploads' folder

app.use('/api/auth',authRoutes); //auth

app.use('/cart', cartRoutes);
app.use('/delivery', deliveryRoutes);
app.use('/card', cardRoutes);

app.use('/api/products', clothesProductRoutes);


app.listen(3000,()=> {
    console.log('Server is running on port 3000!!')
})

app.use('/api/test',userRoutes);

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
});
});