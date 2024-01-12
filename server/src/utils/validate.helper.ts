import { IUser } from "../interfaces/user.interface";

export function validateChef (data: any) : data is IUser {
  return typeof data === 'object' &&
    typeof data.employeeInformation === 'object' &&
    typeof data.employeeInformation.id === 'number' &&
    typeof data.employeeInformation.name === 'string'
}