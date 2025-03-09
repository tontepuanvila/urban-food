import express from 'express'
import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js';

const placeOrder = async (req, res) => {

  try {
      const { userId, items, amount } = req.body
      const orderData = { userId, items, totalAmount:amount,status:"Pending", date: Date.now() }
      const newOrder = new orderModel(orderData)
      await newOrder.save()
      await userModel.findByIdAndUpdate(userId, { cartData: {} })
      res.json({ success: true, message: "Order Placed" })

  } catch (error) {
      res.json({ success: false, message: error.message })
  }

}


const userOrders = async (req,res) => {
    
    const { userId } = req.body;    
      try {
        await orderModel.deleteMany({payment: false });
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
}

// Listing orders for admin panel
const listOrders = async (req, res) => {
  try {
    await orderModel.deleteMany({payment: false });
    const orders = await orderModel.find({})
          .populate({
              path: 'items.menuItemId',
              select: 'name' // Only fetch the 'name' field of the menu item
          });

      res.json({ success: true, data: orders });
  } catch (error) {
      res.json({ success: false, message: error.message });
  }
};



// api for updating order status
const updateStatus = async (req,res) => {
    try {
        await orderModel.findByIdAndUpdate(req.params.id,{status:req.body.status});
        res.json({success:true,message:"Status Updated Successfully."})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

export {placeOrder,userOrders,listOrders,updateStatus}