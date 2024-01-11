import { CategoriesInterface } from "./categories.interface";
import { ItemInterface } from "./item.interface";
import { IUser } from "./user.interface";

export interface OrderItemInterface {
    endTime: string | number | Date;
    startTime: string | number | Date;
    deliveryTimestamp: string | number | Date;
    _id: string;
    restaurantId: number;
    orderId: number;
    categories: CategoriesInterface[];
    orderTime: number;
    orderType: string;
    vipCustomer: boolean;
    tableId: number;
    deliveryServiceArriveTime?: Date;
    items: ItemInterface[];
    status: "pending" | "preparing" | "ready" | "complete";
    createdAt: Date;
    preparingTimestamp?: Date;
    readyTimestamp?: Date;
    servedTimestamp?: Date;
    chef?: IUser;
  }