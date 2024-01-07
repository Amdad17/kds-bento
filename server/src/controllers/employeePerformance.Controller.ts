
import { Request, Response } from 'express';
import { EmployeePerformance } from '../interfaces/employeePerformance.interface';
import { EmployeePerformanceModel } from '../model/employeeperformance.model';

export async function createEmployeePerformance(req: Request, res: Response) {
  try {
    const data: EmployeePerformance = req.body;
    const newEmployeePerformance = await  EmployeePerformanceModel.create(data);
    res.status(201).json(newEmployeePerformance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error in creating employee performance record.' });
  }
}

export async function findEmployeeById(req: Request, res: Response) {
  try {
    const employeeId: number = (req.params.employeeId, 10);
    const employee = await  EmployeePerformanceModel.find(employeeId);

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found.' });
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error in finding employee by ID.' });
  }
}

export async function updateEmployeeById(req: Request, res: Response) {
  try {
    const employeeId: number = (req.params.employeeId, 10);
    const data: EmployeePerformance = req.body;
    const updatedEmployee = await  EmployeePerformanceModel.update(employeeId, data);

    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found.' });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error in updating employee record by ID.' });
  }
}

export async function deleteEmployeeById(req: Request, res: Response) {
  try {
    const employeeId: number = (req.params.employeeId, 10);
    const deletedEmployee = await  EmployeePerformanceModel.delete(employeeId);

    if (!deletedEmployee) {
      return res.status(404).json({ error: 'Employee not found.' });
    }

    res.status(200).json(deletedEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error in deleting employee record by ID.' });
  }
}

export async function findEmployeesByRole(req: Request, res: Response) {
  try {
    const role: string = req.params.role;
    const employees = await EmployeePerformanceModel.find(role);
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error in finding employees by role.' });
  }
}

export async function findEmployeesBySkillTag(req: Request, res: Response) {
  try {
    const skillTag: string = req.params.skillTag;
    const employees = await  EmployeePerformanceModel.find(skillTag);
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error in finding employees by skill tag.' });
  }
}
