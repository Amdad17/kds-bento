import { IChefQueue } from "../interfaces/chefQueue.interface";
import { OrderItemInterface } from "../interfaces/order.interface";
import { IUser } from "../interfaces/user.interface";

export function assignChefToPendingOrders (pendingOrders: OrderItemInterface[], preparingOrders: OrderItemInterface[], chefs: IUser[]) {
  if (!chefs.length) return pendingOrders;
  const chefQueues = generateChefQueues(chefs, preparingOrders);
  const assignedOrders = assignOrdersBasedOnWorkload(pendingOrders, chefQueues);
  return assignedOrders;
}

function generateChefQueues (chefs: IUser[], preparingOrders: OrderItemInterface[]) {
  const queues : IChefQueue[] = chefs.map(chef => {
    const currentOrders = preparingOrders.filter(order => order.chef && order.chef.employeeInformation.id === chef.employeeInformation.id);
    const currentOrdersWithRemainingPrepTime = currentOrders.map(order => {
      const totalPrepTime = order.items.reduce((total, item) => item.itemPreparationTime + total, 0);
      const remainingPrepTime = order.preparingTimestamp ? totalPrepTime - ((Date.now() - (new Date(order.preparingTimestamp)).getTime()) / (1000 * 60)) : totalPrepTime;
      return {
        order,
        prepTime: remainingPrepTime
      }
    });

    return {
      chef,
      queue: currentOrdersWithRemainingPrepTime
    }
  });

  return queues;
}

function assignOrdersBasedOnWorkload (pendingOrders: OrderItemInterface[], chefQueues: IChefQueue[]) {
  const assignedOrders = pendingOrders.map(order => {
    let smallest = chefQueues[0];

    (chefQueues.slice(1)).forEach(chefQueue => {
      const totalWorkTime = chefQueue.queue.reduce((total, item) => item.prepTime + total, 0);
      const currentSmallestWorkTime = smallest.queue.reduce((total, item) => item.prepTime + total, 0);
      if (totalWorkTime < currentSmallestWorkTime) smallest = chefQueue;
    });

    smallest.queue.push({
      order,
      prepTime: order.items.reduce((total, item) => item.itemPreparationTime + total, 0)
    });

    order.chef = smallest.chef;
    return order;
  });

  return assignedOrders;
}