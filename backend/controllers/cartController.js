import userModel from "../models/userModel.js"

// add items to user cart
const addToCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId])
        {
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:"Added to cart"});
    } catch (error) {
        res.json({success:false,message:"Error"})
    }
}


// remove items from user cart
const removeFromCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed from cart"})
    } catch (error) {
        res.json({success:false,message:"Error"})
        
    }
}

// fetch user cart data
const getCart = async (req, res) => {
    try {
        // Fetch user data by ID and convert to a plain object
        let userData = await userModel.findById(req.body.userId).lean();        
        // Check if user exists
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }
        
        // Access cart data
        let cartData = userData.cartData;        
        // Return response with cart data
        res.json({ success: true,data:cartData });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

export {addToCart,removeFromCart,getCart}