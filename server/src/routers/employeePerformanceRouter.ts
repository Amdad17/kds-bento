import express, { Request,Response} from 'express'
import { getAllEmployee,createEmployee } from '../controllers/employeePerformance.Controller'


const employeePermanceRouter = express.Router()

employeePermanceRouter.get('/employee', getAllEmployee);
employeePermanceRouter.post('/create',createEmployee );

export default employeePermanceRouter;