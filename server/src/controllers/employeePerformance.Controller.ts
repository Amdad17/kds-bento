import { Request,Response } from "express";
import { EmployeePerformanceModel } from "../model/employeeperformance.model"; 


export const getAllEmployee = async(req: Request,res:Response) =>{
    try{
        const employee = await EmployeePerformanceModel.find();
    res.json(employee);
    res.status(202)
    }catch (error){
    console.error(error);
    res.status(502).json({message: 'Error Fetching employeeperformance'});
    }
};

export const createEmployee = async (req: Request, res: Response) => {
    try {
      const newEmployeePerformance = req.body
      const createEmployeePerformance = await EmployeePerformanceModel.create(newEmployeePerformance)
      res.status(201).json(createEmployeePerformance);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Error creating  employeeperformance' });
    }
  };



    
    
