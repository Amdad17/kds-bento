import axios from "axios";
import { config } from "../config";

export async function getTokenFromCode (code: string) {
  try {
    const res = await axios.get(config.SKELETON_BE_URL + "/service-auth/token/" + code);
    return res;
  } catch (error) {
    throw new Error("Error getting token from code.");
  }
}


export async function verifyToken (token: string) {
  try {
    const res = await axios.post<{ auth: boolean }>(config.SKELETON_BE_URL + '/service-auth/verify', {}, { headers: { 'Authorization': token }});
    return res.data;
  } catch (error) {
    throw new Error("Error verifying user token.");
  }
}