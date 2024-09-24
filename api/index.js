import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'



import cartRoutes from './routes/Cart_route.js';  
import cardRoutes from './routes/card.route.js'; 
import deliveryRoutes from './routes/Delivery_route.js';

import clothesProductRoutes from './routes/clothesProductRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

import cors from 'cors';
import supportRoutes from './routes/support.route.js'

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


app.use('/cart', cartRoutes);
app.use('/delivery', deliveryRoutes);
app.use('/card', cardRoutes);

app.use('/api/products', clothesProductRoutes);
app.use('/api/support', supportRoutes); // Support routes


app.listen(3000,()=> {
    console.log('Server is running on port 3000!!')
})

app.use('/api/test',userRoutes);