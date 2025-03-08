import express from 'express'
import orderModel from "../models/orderModel.js";
import paypal from 'paypal-rest-sdk';

const deliveryCharge = 10
paypal.configure({
    'mode': 'sandbox', 
    'client_id': process.env.PAYPAL_CLIENT_ID,
    'client_secret': process.env.PAYPAL_CLIENT_SECRET
  });

const placeOrder = async (req,res) => {

    const { userId, items, amount } = req.body;
    const { origin } = req.headers;
    const orderData = {
        userId,
        items: items.map(item => ({
          menuItemId: item.menuItemId,
          quantity: item.quantity
        })),
        totalAmount: items.reduce((total, item) => total + (item.price * item.quantity), 0) + deliveryCharge,
        status: 'Pending',
        createdAt: Date.now(),
        payment: false
      };
      
      const newOrder = new orderModel(orderData);
      await newOrder.save();      
      console.log(newOrder)

    const create_payment_json = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal'
      },
      redirect_urls: {
         "return_url": `${origin}/verify?success=true&orderId=${newOrder._id}`,
            "cancel_url": `${origin}/verify?success=false&orderId=${newOrder._id}`
      },
      transactions: [{
        item_list: {
          items: items.map(item => ({
            name: item.menuItemId,
            sku: item.menuItemId,
            price: item.price.toFixed(2),
            currency: 'USD',
            quantity: item.quantity
          }))
        },
        amount: {
          currency: 'USD',
          total: amount.toFixed(2)
        },
        description: ''
      }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
          throw error;
        } else {
          res.json({ success: true, redirect_url: payment.links.find(link => link.rel === 'approval_url').href });
        }
      });
  
}
  
  const verifyOrder=async (req, res) => {
    const { userId, orderId, success, paymentId, PayerID, amount } = req.body;
    try {
      if (success === "true") {
        const execute_payment_json = {
          "payer_id": PayerID,
          "transactions": [{
            "amount": {
              "currency": 'USD',
              "total": (amount + deliveryCharge).toFixed(2)
            }
          }]
        };
  
        paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
          if (error) {
            throw error;
          } else {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await UserModel.findByIdAndUpdate(userId, { cartData: {} });
            res.json({ success: true });
          }
        });
      } else {
        await orderModel.findByIdAndDelete(orderId);
        res.json({ success: false });
      }
    } catch (error) {
      res.json({ success: false, message: error.message });
    }
}


const userOrders = async (req,res) => {
    
    const { userId } = req.body;
    console.log(userId)
    
      try {
        // await orderModel.deleteMany({payment: false });
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
      const orders = await orderModel.find({})
          .populate({
              path: 'items.menuItemId',
              select: 'name' // Only fetch the 'name' field of the menu item
          });

      res.json({ success: true, data: orders });
  } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
  }
};



// api for updating order status
const updateStatus = async (req,res) => {
    try {
        await orderModel.findByIdAndUpdate(req.params.id,{status:req.body.status});
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus}