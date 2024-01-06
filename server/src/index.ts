import express , {Express, Request , Response} from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import orderRouter from './routers/orderRouter';
import employeePermanceRouter from './routers/employeePerformanceRouter';
import ruleSetterRouter from './routers/ruleSetterRouter';
import rulerouter from './routers/ruleRouter';
import ruleorderrouter from './routers/router.rule.order';

const PORT = process.env.port || 5000;

const app:Express = express()
app.use(cors())
app.use(express.json())
app.use('/order', orderRouter);
app.use('/create-employee', employeePermanceRouter);
app.use('/rule-setter',ruleSetterRouter)
app.use('/rules',rulerouter)
app.use('/create', ruleorderrouter )

async function main (){{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/KDS");
         //await mongoose.connect("mongodb+srv://KDS_user:123456a@kds.gkxu3vj.mongodb.net/");
        console.log('db connected mongoose');
        app.listen(PORT , () =>{
            console.log('Server running on Port' , PORT);
        })
    } catch (error) {
        
    }
}}

main();