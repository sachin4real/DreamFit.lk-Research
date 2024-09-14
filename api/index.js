import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'



import cartRoutes from './routes/Cart_route.js';  
import cardRoutes from './routes/card.route.js'; 
import deliveryRoutes from './routes/Delivery_route.js';

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

app.use('/cart', cartRoutes);
app.use('/delivery', deliveryRoutes);
app.use('/card', cardRoutes);


app.listen(3000,()=> {
    console.log('Server is running on port 3000!!')
})

app.use('/api/test',userRoutes);