import express from "express"
import authMiddleware from "../middleware/auth.js"
import { placeOrder, userOrders, listOrders, updateStatus } from "../controllers/orderController.js"

const orderRouter = express.Router();

orderRouter.post("/placeOrder",authMiddleware,placeOrder);
orderRouter.post("/userorders",authMiddleware,userOrders)
orderRouter.get("/listOrders",listOrders)
orderRouter.put("/updateStatus/:id",updateStatus)


export default orderRouter;