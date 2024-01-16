import axios from "axios";
import { config } from "../config";
import { IUser } from "../interfaces/user.interface";
import { OrderItemInterface } from "../interfaces/order/order.interface";

export async function getTokenFromCode (code: string) {
  try {
    const res = await axios.get(config.SKELETON_BE_URL + "/service-auth/token/" + code);
    return res;
  } catch (error) {
    throw new Error("Error getting token from code.");
  }
}


export async function getUserFromToken (token: string) {
  try {
    const res = await axios.get<{ user: IUser }>(config.SKELETON_BE_URL + '/service-auth/user-from-token', { headers: { 'Authorization': token }});
    return res.data;
  } catch (error) {
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
    const res = await axios.get<{ data: OrderItemInterface[] }>(config.SKELETON_BE_URL + '/orders/all', { headers: { 'Authorization': token }});
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting active chefs.")
  }
}


export async function postChefEfficiencyToHR (token: string, data: { chefId: number, orderId: string, servedOnTime: boolean }) {
  try {
    const res = await axios.post<any>(config.SKELETON_BE_URL + '/hr/chef-efficiency', data, { headers: { 'Authorization': token }});
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting active chefs.")
  }
}