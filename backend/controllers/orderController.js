import express from 'express';
import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js';

/**
 * Place a new order.
 * Creates a new order in the database and clears the user's cart.
 * 
 * @param {Object} req - The request object containing user ID, order items, and amount.
 * @param {Object} res - The response object to send the result.
 * @returns {Object} - Success or failure message.
 */
const placeOrder = async (req, res) => {
  try {
      const { userId, items, amount } = req.body;
      const orderData = { userId, items, totalAmount: amount, status: "Pending", date: Date.now() };
      const newOrder = new orderModel(orderData);
      await newOrder.save();
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true, message: "Order Placed" });
  } catch (error) {
      res.json({ success: false, message: error.message });
  }
};

/**
 * Get all orders for a specific user.
 * Fetches orders for the given user ID and populates item names.
 * Also deletes unpaid orders from the database.
 * 
 * @param {Object} req - The request object containing the user ID.
 * @param {Object} res - The response object to send the result.
 * @returns {Object} - A list of orders with item names.
 */
const userOrders = async (req, res) => {
  const { userId } = req.body;
  try {
      await orderModel.deleteMany({ payment: false });
      const orders = await orderModel.find({ userId }).populate('items.menuItemId', 'name');
      const ordersWithNames = orders.map(order => {
          const itemsWithNames = order.items.map(item => ({
              menuItemId: item.menuItemId._id,
              menuItemName: item.menuItemId.name,
              quantity: item.quantity
          }));
          return {
              ...order.toObject(),
              items: itemsWithNames
          };
      });

      res.json({ success: true, data: ordersWithNames });
  } catch (error) {
      res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * List all orders (for admin purposes).
 * Fetches all orders and populates item names.
 * Also deletes unpaid orders from the database.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send the result.
 * @returns {Object} - A list of all orders.
 */
const listOrders = async (req, res) => {
  try {
      await orderModel.deleteMany({ payment: false });
      const orders = await orderModel.find({}).populate({
          path: 'items.menuItemId',
          select: 'name'
      });
      res.json({ success: true, data: orders });
  } catch (error) {
      res.json({ success: false, message: error.message });
  }
};

/**
 * Update the status of an order.
 * Allows updating the order's status based on the provided ID and status.
 * 
 * @param {Object} req - The request object containing order ID and the new status.
 * @param {Object} res - The response object to send the result.
 * @returns {Object} - Success or failure message.
 */
const updateStatus = async (req, res) => {
  try {
      await orderModel.findByIdAndUpdate(req.params.id, { status: req.body.status });
      res.json({ success: true, message: "Status Updated Successfully." });
  } catch (error) {
      res.json({ success: false, message: error.message });
  }
};

export { placeOrder, userOrders, listOrders, updateStatus };
