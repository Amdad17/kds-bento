import { EmployeePerformance } from '../../interfaces/employeePerformance.interface';
import { EmployeePerformanceModel } from './employeePerformance.model';


export async function createEmployeePerformance(data: EmployeePerformance) {
  try {
    const newEmployeePerformance = await EmployeePerformanceModel.create(data);
    return newEmployeePerformance;
  } catch (error) {
    console.error(error);
    throw new Error('Error in creating employee performance record.');
  }
}
export async function findEmployeeById(employeeId: number) {
  try {
    const employee = await EmployeePerformanceModel.findOne({ employeeId });
    return employee;
  } catch (error) {
    console.error(error);
    throw new Error('Error in finding employee by ID.');
  }
}

export async function updateEmployeeById(employeeId: number, data: EmployeePerformance) {
  try {
    const updatedEmployee = await EmployeePerformanceModel.findOneAndUpdate({ employeeId }, { $set: data }, { new: true });
    return updatedEmployee;
  } catch (error) {
    console.error(error);
    throw new Error('Error in updating employee record by ID.');
  }
}


export async function deleteEmployeeById(employeeId: number) {
  try {
    const deletedEmployee = await EmployeePerformanceModel.findOneAndDelete({ employeeId });
    return deletedEmployee;
  } catch (error) {
    console.error(error);
    throw new Error('Error in deleting employee record by ID.');
  }
}


export async function findEmployeesByRole(role: string) {
  try {
    const employees = await EmployeePerformanceModel.find({ role });
    return employees;
  } catch (error) {
    console.error(error);
    throw new Error('Error in finding employees by role.');
  }
}
export async function findEmployeesBySkillTag(skillTag: string) {
  try {
    const employees = await EmployeePerformanceModel.find({ skillTags: skillTag });
    return employees;
  } catch (error) {
    console.error(error);
    throw new Error('Error in finding employees by skill tag.');
  }
}
