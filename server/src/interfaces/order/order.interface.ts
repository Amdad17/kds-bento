import { CategoriesInterface } from "./categories.interface";
import { ItemInterface } from "./item.interface";
import { IUser } from "../user.interface";

export interface OrderItemInterface {
    restaurantId: number;
    orderId: string;
    categories: CategoriesInterface[];
    orderTime: number;
    orderType: string;
    vipCustomer: boolean;
    tableId: string;
    deliveryServiceArriveTime?: Date;
    items: ItemInterface[];
    status: "pending" | "preparing" | "ready" | "complete"; 
    createdAt: Date;
    preparingTimestamp?: Date;
    readyTimestamp?: Date;
    servedTimestamp?: Date;
    chef?: IUser;
    deliveryTimestamp?: string | number | Date;
  }