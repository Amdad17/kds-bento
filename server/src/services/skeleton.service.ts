import axios from "axios";
import { config } from "../config";
import { IUser } from "../interfaces/user.interface";
import { IOrder } from "../interfaces/order/order.interface";

export async function getTokenFromCode (code: string) {
  try {
    const res = await axios.get(config.SKELETON_BE_URL + "/service-auth/token/" + code);
    return res;
  } catch (error) {
    throw new Error("Error getting token from code.");
  }
}
export async function  getUserFromToken (token: string) {
  try {
    // console.log("object====", token);
    const res = await axios.get<{ user: IUser }>(config.SKELETON_BE_URL + '/service-auth/user-from-token', { headers: { 'Authorization':  token }});
    console.log('res from get user token utility 🥳🥳🥳🥳🥳🥳🥳🥳ß' , res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting user from token.")
  }
}

export async function getActiveChefsFromHR (token: string) {
  try {
    const res = await axios.get<any>(config.SKELETON_BE_URL + '/employee/position/chef/active', { headers: { 'Authorization': token }});
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting active chefs.")
  }
}


export async function getAllOrders (token: string) {
  try {
    const res = await axios.get<{ data: IOrder[] }>(config.SKELETON_BE_URL + '/orders/all', { headers: { 'Authorization': token }});
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting orders.")
  }
}

export async function sendOrderUpdateToPOS (token: string, orderId: string, status: string , type:string) {
  try {
    const res = await axios.put<IOrder>(config.SKELETON_BE_URL + '/orders/status/' + orderId, { status , type }, { headers: { 'Authorization': token }});
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting orderUpdate.")
  }
}

export async function sendOrderChefToPOS (token: string, orderId: string, chef: IUser) {
  try {
    const res = await axios.put<IOrder>(config.SKELETON_BE_URL + '/orders/chef/' + orderId, { chef }, { headers: { 'Authorization': token }});
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting  post to ChefToPOS .")
  }
}


export async function postChefEfficiencyToHR (token: string, data: { chefId: number, orderId: string, servedOnTime: boolean }) {
  try {
    const res = await axios.post<any>(config.SKELETON_BE_URL + '/hr/chef-efficiency', data, { headers: { 'Authorization': token }});
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting to post chef efficiency.")
  }

}
export async function getAllOrdersByHourly(token:string){
  try {
    const res = await axios.get<{ data: { count: number, hour: number }[] }>(config.SKELETON_BE_URL + '/pos/order-stats/hourly', { headers: { 'Authorization': token }});
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting ordersBYHourly.")
  }
}
export async function getAllOrdersByWeekly(token:string){
  try {
    const res = await axios.get<{ data:{ count: number, week: number }[] }>(config.SKELETON_BE_URL + '/pos/order-stats/weekday', { headers: { 'Authorization': token }});
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting ordersByWeekly.")
  }
}
export async function getAllOrdersByMonthly(token:string){
  try {
    const res = await axios.get<{ data:{ count: number, month: number }[] }>(config.SKELETON_BE_URL + 'pos/order-stats/monthly', { headers: { 'Authorization': token }});
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting ordersByMonthly.")
  }

}
  export async function postRestaurantUtilizationToSkeleton (token: string, data: { utilization: number }) {
    try {
      const res = await axios.post<any>(config.SKELETON_BE_URL + '/utilization/set', data, { headers: { 'Authorization': token }});
      return res.data;
    } catch (error) {
      console.log(error);
      throw new Error("Error getting to post RestaurantUtilization.")
    }
}


export async function getRestaurantUtilizationFromSkeleton(token: string, id: number) {
  try {
    const res = await axios.get<{ restaurantId: number, utilization: number, updatedAt: Date }>(config.SKELETON_BE_URL + '/utilization/restaurant/' + id, { headers: { 'Authorization': token }});
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting restaurant utilization from skeleton.")
  }
  
}