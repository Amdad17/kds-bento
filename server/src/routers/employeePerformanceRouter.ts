import express, { Request,Response} from 'express'
import { findEmployeeById,createEmployeePerformance} from '../controllers/employeePerformance.controller'


const employeePermanceRouter = express.Router()

employeePermanceRouter.get('/employee', findEmployeeById);
employeePermanceRouter.post('/create',createEmployeePerformance );

export default employeePermanceRouter;