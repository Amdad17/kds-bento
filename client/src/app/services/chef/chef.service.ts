import { Injectable } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';
import { Subject } from 'rxjs';
import { ToastMessageService } from '../toast-message/toast-message.service';

@Injectable({
  providedIn: 'root',
})
export class ChefService {
 

  constructor(private toast: ToastMessageService) {}

  chefs: IUser[] = [
    // {
    //   positionId: 2,
    //   employeeInformation: {
    //     id: 2,
    //     restaurantId: 1,
    //     name: 'Nazim  Leeman ',
    //     email: 'chef@gmail.com',
    //     experience: [],
    //     phoneNumber: 1624752189,
    //     address: 'Tongi, Gazipur',
    //     skillTags: [],
    //     hourlyRate: 50,
    //     efficiency: '',
    //     createdAt: new Date('2024-01-07T06:46:26.349Z'),
    //     updatedAt: new Date('2024-01-07T06:46:34.962Z'),
    //     applicantId: null,
    //     position: {
    //       id: 2,
    //       position: 'Chef',
    //       employeeId: 2,
    //       restaurantId: 1,
    //       services: ['INVENTORY', 'KDS'],
    //       createdAt: new Date('2024-01-07T06:37:43.889Z'),
    //       updatedAt: new Date('2024-01-07T06:46:34.855Z'),
    //     }
    //   }
    // },
    // {
    //   positionId: 2,
    //   employeeInformation: {
    //     id: 3,
    //     restaurantId: 1,
    //     name: 'Alfred  Pithu ',
    //     email: 'alfred@gmail.com',
    //     experience: [],
    //     phoneNumber: 1624752189,
    //     address: 'Tongi, Gazipur',
    //     skillTags: [],
    //     hourlyRate: 50,
    //     efficiency: '',
    //     createdAt: new Date('2024-01-07T06:46:26.349Z'),
    //     updatedAt: new Date('2024-01-07T06:46:34.962Z'),
    //     applicantId: null,
    //     position: {
    //       id: 2,
    //       position: 'Chef',
    //       employeeId: 2,
    //       restaurantId: 1,
    //       services: ['INVENTORY', 'KDS'],
    //       createdAt: new Date('2024-01-07T06:37:43.889Z'),
    //       updatedAt: new Date('2024-01-07T06:46:34.855Z'),
    //     }
    //   }
    // },
    // {
    //   positionId: 4,
    //   employeeInformation: {
    //     id: 4,
    //     restaurantId: 1,
    //     name: 'Tanveer Anzoom',
    //     email: 'tanveer@gmail.com',
    //     experience: [],
    //     phoneNumber: 1624752189,
    //     address: 'Tongi, Gazipur',
    //     skillTags: [],
    //     hourlyRate: 50,
    //     efficiency: '',
    //     createdAt: new Date('2024-01-07T06:46:26.349Z'),
    //     updatedAt: new Date('2024-01-07T06:46:34.962Z'),
    //     applicantId: null,
    //     position: {
    //       id: 2,
    //       position: 'Chef',
    //       employeeId: 2,
    //       restaurantId: 1,
    //       services: ['INVENTORY', 'KDS'],
    //       createdAt: new Date('2024-01-07T06:37:43.889Z'),
    //       updatedAt: new Date('2024-01-07T06:46:34.855Z'),
    //     }
    //   }
    // },
  ];

  chefChange = new Subject<IUser[]>();

  checkIn (chef: IUser) {
    this.chefs.push(chef);
    this.chefChange.next(this.chefs);
    this.toast.setMessage(chef.employeeInformation.name + ' checked in.', "info");
  }
  
  checkOut (chef: IUser) {
    this.chefs = this.chefs.filter(current => current.employeeInformation.id !== chef.employeeInformation.id);
    this.chefChange.next(this.chefs);
    this.toast.setMessage(chef.employeeInformation.name + ' checked out.', "info");
  }

  emitActiveChefs (chefs: IUser[]) {
    this.chefs = chefs;
    this.chefChange.next(chefs);
  }
}
