import { IOrder } from "../interfaces/order/order.interface";
import { IUser } from "../interfaces/user.interface";
import { getActiveChefsFromHR, getAllOrders, getRestaurantUtilizationFromSkeleton, postRestaurantUtilizationToSkeleton } from "../services/skeleton.service";

export async function handleRestaurantUtilization (token: string, restaurantId: number) {
  try {
    const chefData = await getActiveChefsFromHR(token);
    const chefs = chefData.data;

    const orderData = await getAllOrders(token);
    const orders = orderData.data;

    const currentUtilization = await getRestaurantUtilizationFromSkeleton(token, restaurantId);

    const calculated = calculateUtilization(orders, chefs);

    if (calculated !== currentUtilization.utilization)
      await postRestaurantUtilizationToSkeleton(token, { utilization: calculated });

    return calculated;
  } catch (error) {
    console.log(error);
    throw new Error('Error calculating and setting restaurant utilization.');
  }
}

function calculateUtilization (orders: IOrder[], chefs: IUser[]) {
  const totalChefHours = chefs.length * 60;
  const pendingOrders = orders.filter(order => order.status === "pending");
  const totalPreparationTime = pendingOrders.reduce((total, order) => {
    const totalPrep = order.items.reduce((total, item) => item.item.itemPreparationtime + total, 0);
    return totalPrep + total;
  }, 0);

  const calculatedUtilization = (totalPreparationTime / totalChefHours) * 100;
  const roundedUtilization = Math.round(calculatedUtilization / 10) * 10;
  return roundedUtilization;
}