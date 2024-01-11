import { Injectable } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ChefService {
  constructor() {}

  chefs: IUser[] = [
    {
      positionId: 2,
      employeeInformation: {
        id: 2,
        restaurantId: 1,
        name: 'Nazim  Leeman ',
        email: 'chef@gmail.com',
        experience: [],
        phoneNumber: 1624752189,
        address: 'Tongi, Gazipur',
        skillTags: [],
        hourlyRate: 50,
        efficiency: '',
        createdAt: new Date('2024-01-07T06:46:26.349Z'),
        updatedAt: new Date('2024-01-07T06:46:34.962Z'),
        applicantId: null,
        position: {
          id: 2,
          position: 'Chef',
          employeeId: 2,
          restaurantId: 1,
          services: ['INVENTORY', 'KDS'],
          createdAt: new Date('2024-01-07T06:37:43.889Z'),
          updatedAt: new Date('2024-01-07T06:46:34.855Z'),
        },
      },
    },
    {
      positionId: 2,
      employeeInformation: {
        id: 3,
        restaurantId: 1,
        name: 'Alfred  Pithu ',
        email: 'alfred@gmail.com',
        experience: [],
        phoneNumber: 1624752189,
        address: 'Tongi, Gazipur',
        skillTags: [],
        hourlyRate: 50,
        efficiency: '',
        createdAt: new Date('2024-01-07T06:46:26.349Z'),
        updatedAt: new Date('2024-01-07T06:46:34.962Z'),
        applicantId: null,
        position: {
          id: 2,
          position: 'Chef',
          employeeId: 2,
          restaurantId: 1,
          services: ['INVENTORY', 'KDS'],
          createdAt: new Date('2024-01-07T06:37:43.889Z'),
          updatedAt: new Date('2024-01-07T06:46:34.855Z'),
        },
      },
    },
    {
      positionId: 4,
      employeeInformation: {
        id: 4,
        restaurantId: 1,
        name: 'Tanveer Anzoom',
        email: 'tanveer@gmail.com',
        experience: [],
        phoneNumber: 1624752189,
        address: 'Tongi, Gazipur',
        skillTags: [],
        hourlyRate: 50,
        efficiency: '',
        createdAt: new Date('2024-01-07T06:46:26.349Z'),
        updatedAt: new Date('2024-01-07T06:46:34.962Z'),
        applicantId: null,
        position: {
          id: 2,
          position: 'Chef',
          employeeId: 2,
          restaurantId: 1,
          services: ['INVENTORY', 'KDS'],
          createdAt: new Date('2024-01-07T06:37:43.889Z'),
          updatedAt: new Date('2024-01-07T06:46:34.855Z'),
        },
      },
    },
  ];
}
