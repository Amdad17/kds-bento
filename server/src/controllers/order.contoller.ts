import { Response } from "express";
import { AuthRequest } from "../interfaces/authRequest.interface";
import { getAllOrders, postChefEfficiencyToHR, sendOrderUpdateToPOS } from "../services/skeleton.service";

export async function incomingOrder(req: AuthRequest, res: Response) {
  try {
    const { user } = req;
    if (!user) return res.status(401).send({ message: 'Unauthorized' });
    const data = req.body;

    // Emit new order with Socket IO.
    const io = res.locals.io;
    io.to().emit('new-order', data);

    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error in creating a new order." });
  }
}

export async function createOrder(req: AuthRequest, res: Response) {
  try {
    const data = req.body;

    // Emit new order with Socket IO.
    const io = res.locals.io;
    io.to().emit('new-order', data);

    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error in creating a new order." });
  }
}

// export async function addChefToOrder (req: AuthRequest, res: Response) {
//   try {
//     const user = req.user;
//     if (!user) return res.status(401).send({ message: "Unauthorized." });

//     const orderId = req.params.orderId;
//     const chef = req.body.chef;

//     const order = await Orders.findById(orderId);
//     if (!order) return res.status(404).send({ message: 'Order not found.'});
//     if (order.restaurantId !== user.employeeInformation.restaurantId) 
//       return res.status(403).json({ error: "Order not from your restaurant." });

//     order.chef = chef;
//     await order.save();
//     res.send(order);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error in setting chef for order." });
//   }
// }

export async function findOrdersByRestaurantId(
  req: AuthRequest,
  res: Response
) {
  try {
    const token = req.token;
    if (!token) return res.status(401).send({ message: "Unauthorized." });

    const orders = await getAllOrders(token);
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error in finding orders by restaurantId." });
  }
}

export async function changeOrderStatus(req: AuthRequest, res: Response) {
  try {
    const user = req.user;
    const token = req.token;
    if (!user || !token) return res.status(401).send({ message: "Unauthorized." });

    const { orderId, status } = req.body;

    if (
      !orderId ||
      (status !== "pending" &&
      status !== "preparing" &&
      status !== "ready" &&
      status !== "complete")
    ) return res.status(400).send({ message: "Invalid fields." });

    const order = await sendOrderUpdateToPOS(token, orderId, status);

    if (status === 'ready' || status === 'complete') {
      if (order.chef) {
        const chefId = order.chef.employeeInformation.id;
        const totalPrepTime = order.items.reduce((total, item) => item.item.itemPreparationTime + total, 0);
        const actualPrepTime = (new Date(order.readyTimestamp!).getTime() - new Date(order.preparingTimestamp!).getTime()) / 60000;
        const servedOnTime = totalPrepTime <= actualPrepTime;

        postChefEfficiencyToHR(token, { chefId, orderId: order._id, servedOnTime });
      }
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error in updating order status." });
  }
}
