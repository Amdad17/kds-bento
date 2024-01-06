import express, { Express } from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import orderRouter from './routers/orderRouter';
import employeePermanceRouter from './routers/employeePerformanceRouter';
import ruleSetterRouter from './routers/ruleSetterRouter';
import rulerouter from './routers/ruleRouter';
import ruleorderrouter from './routers/router.rule.order';
import { config } from './config';

const app : Express = express()
app.use(cors({ origin: config.CORS_ORIGIN.split(',')}));
app.use(express.json())
app.use('/order', orderRouter);
app.use('/create-employee', employeePermanceRouter);
app.use('/rule-setter',ruleSetterRouter)
app.use('/rules',rulerouter)
app.use('/create', ruleorderrouter )

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