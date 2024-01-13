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

const app: Express = express();

// app.get('/check' , (req, res) =>{
//   res.send('working')
// })

const server = http.createServer(app);
const io = new Server(server, {
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
app.use("/orders", orderRouter);
app.use("/chef", chefRouter);
app.use(authMiddleware);
app.use("/rules", rulerouter);




async function main() {
  try {
    await mongoose.connect(config.MONGOOSE_URI);
    console.log("db connected mongoose");
    server.listen(config.PORT, () => {
      console.log("Server running on Port", config.PORT);
    });
  } catch (error) {}
}

main();

io.on("connection", (socket) => {
  socket.emit("me", socket.id);
  socket.on("join", (data: { restaurantId: number }) => {
    socket.join(data.restaurantId.toString());
  });
});
