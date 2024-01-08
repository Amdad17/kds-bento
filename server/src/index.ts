import express, { Express } from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import orderRouter from './routers/orderRouter';
import rulerouter from './routers/ruleRouter';
import authrouter from './routers/auth.router';
import { config } from './config';

const app : Express = express()
app.use(cors(
    { 
        origin: config.CORS_ORIGIN.split(','),
        exposedHeaders: ['Authorization']
    }));
app.use(express.json())
app.use('/order', orderRouter);
app.use('/rules', rulerouter)
app.use('/auth',authrouter)

async function main (){
    try {
        await mongoose.connect(config.MONGOOSE_URI);
        console.log('db connected mongoose');
        app.listen(config.PORT , () =>{
            console.log('Server running on Port' , config.PORT);
        })
    } catch (error) {
        
    }
}
main();