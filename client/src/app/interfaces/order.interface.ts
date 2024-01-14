import { CategoriesInterface } from "./categories.interface";
import { ItemInterface } from "./item.interface";
import { IUser } from "./user.interface";

export interface OrderItemInterface {
    deliveryTimestamp?: string | number | Date;
    _id: string;
    restaurantId: number;
    orderId: number;
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
  }