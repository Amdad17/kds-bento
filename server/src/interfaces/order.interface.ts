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
    deliveryServiceArriveTime?: Date;
    items: ItemInterface[];
    status: "pending" | "preparing" | "ready" | "complete";
    createdAt: Date;
    preparingTimestamp?: Date;
    readyTimestamp?: Date;
    servedTimestamp?: Date;
  }