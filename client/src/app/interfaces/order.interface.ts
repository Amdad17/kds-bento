import { CategoriesInterface } from "./categories.interface";
import { ItemInterface } from "./item.interface";

export interface OrderItemInterface {
    restaurantId: number;
    orderId: number;
    categories: CategoriesInterface[];
    orderTime: number;
    orderType: string;
    vipCustomer: boolean;
    tableId: number;
    deliveryServiceArriveTime?: number;
    items: ItemInterface[];
    createdAt: Date;
    preparingTimestamp?: Date;
    readyTimestamp?: Date;
    servedTimestamp?: Date;
  }