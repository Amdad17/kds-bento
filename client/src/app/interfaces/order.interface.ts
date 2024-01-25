import { CategoriesInterface } from './categories.interface';
import { ItemInterface } from './item.interface';
import { IUser } from './user.interface';

export interface OrderItemInterface {
deliveryETA: any;
  destinationLocation(sourceLocation: (sourceLocation: any, destinationLocation: any) => unknown, destinationLocation: any): unknown;
  sourceLocation(sourceLocation: any, destinationLocation: any): unknown;
  timestamp: string | number | Date;
orderType: any;
  _id: string;
  restaurantId: number;
  type: string;
  customerId?: number;
  waiterId?: number;
  bill: number;
  unit: string;
  status: string;
  vipCustomer: boolean;
  items: ItemInterface[];
  createdAt: Date;
  orderPosted?: Date;
  orderUpdatedAt?: Date;
  preparingTimestamp?: Date;
  readyTimestamp?: Date;
  servedTimestamp?: Date;
  chef?: IUser;
  deliveryTimestamp?: Date;
  deliveryServiceArriveTime?: Date;
  cancelTimestamp?: Date;
  // quickService?: boolean;
}
