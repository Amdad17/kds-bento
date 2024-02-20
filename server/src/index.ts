import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import orderRouter from "./routers/orderRouter";
import rulerouter from "./routers/ruleRouter";
import authrouter from "./routers/auth.router";
import { config } from "./config";
import { authMiddleware } from "./middleware/auth.middleware";
import chefRouter from "./routers/chef.router";
import ordersBYHourlyRouter from "./routers/ordersByHourlyRouter";
import ordersBYWeeklyRouter from "./routers/ordersByWeeklyRouter";
import ordersBYMonthlyRouter from "./routers/ordersByMonthlyRouter";
import restaurantUtilizationRouter from "./routers/restaurantUtilizationRouter";
import { closeMQConnection, connectAndconsumeMQDataForMarketplaceOrders } from "./services/marketplaceOrderMQ.service";

const app: Express = express();

const server = http.createServer(app);
export const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

app.use((req: Request, res: Response, next: NextFunction) => {
    // Attach io to app locals
    res.locals.io = io;
    next();
});

app.use(
  cors({
    origin: config.CORS_ORIGIN.split(","),
    exposedHeaders: ["Authorization"],
  })
);
app.use(express.json());
app.use("/auth", authrouter);
app.use(authMiddleware);
app.use("/chef", chefRouter);
app.use("/orders", orderRouter);
app.use("/rules", rulerouter);
app.use('/orders-hourly', ordersBYHourlyRouter);
app.use('/orders-weekly',ordersBYWeeklyRouter);
app.use('/orders-monthly',ordersBYMonthlyRouter)
app.use('/utilization', restaurantUtilizationRouter);


async function main() {
  try {
    // await mongoose.connect(config.MONGOOSE_URI);
    console.log("db connected mongoose");
    // connecting to rabbitmq from here

    server.listen(8000, () => {
      console.log("Server running on Port", config.PORT);
    });

    await connectAndconsumeMQDataForMarketplaceOrders()


  } catch (error) {}
}

main();

io.on("connection", (socket) => {
  socket.emit("me", socket.id);
  socket.on("join", (data: { restaurantId: number }) => {
    socket.join(data.restaurantId.toString());
  });
});



// Handle server shutdown. Close MQ Connection
process.on('SIGINT' , async() =>{
  console.log('Closing MQ Connection')
  await closeMQConnection();
  process.exit(0)
})