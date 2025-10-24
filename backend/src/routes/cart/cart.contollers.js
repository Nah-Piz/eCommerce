import jwt from "jsonwebtoken"
import { Products } from "../../database/pdts.schema.js";
import { Cart } from "../../database/users.schemas.js";

export const addCart = async (req,res) => {
    const { body:{product,user,quantity} } = req;
    const { token } = req.cookies;
    const userStatus = { isLogged: true }

    try {
        const foundPdt = await Products.findById(product);
        if (!foundPdt) return res.status(403).json({ success: false, msg: "Product does not exist anymore." });
    } catch (error) {
        res.status(500).json({ success: false, error:error.message, msg: "Server failed to add product to cart." });
    }  
        
    // check if it exists in cart
    
    try {
        let foundCart = await Cart.findOne({ user });
        if (!foundCart) foundCart = new Cart({ user, items: [] });
        const existingPdt = foundCart.items.find(pdt => pdt.product.toString() === product);
        if (existingPdt) { 
            (quantity) ? existingPdt.quantity = quantity : existingPdt.quantity += 1;
        } else {
            foundCart.items.push({ product });
        }
        userStatus.length = foundCart.items.length;
        await foundCart.save();
        return res.status(201).json({ success: true, msg: "Product successfully added to user cart.", userStatus })
    } catch (error) {
        res.status(500).json({ success: false, error:error.message, msg: "Server failed to add product to cart." });
    } 
}


export const getAllCartItems = async (req, res) => {
    const { user } = req.body;
    
    try {
        const detailedCart = await Cart.findOne({ user })
            .populate({
                path: "items.product",
                select: "name price image",
                model: "Products"
            });
        res.status(200).json({success:true,data:detailedCart.items,msg:"Since your have an account, you can access cart services......"})
    } catch (error) {
        res.status(500).json({ success: false, error:error.message, msg: "Server failed to add product to cart." });
    }
}

export const removeCartItem = async (req,res) => {
    const { id } = req.params;
    const { user } = req.body;
    try {
        let userCart = await Cart.findOne({ user });
        if (userCart) {
            const cartItems = userCart.items.filter(f => f._id.toString() !== id);
            userCart.items = cartItems;
        }
        await userCart.save();
        const savedCart = await Cart.findOne({ user })
            .populate({
                path: "items.product",
                select: "name price image",
                model: "Products"
            });
        const status = {
            isLogged: true,
            length: savedCart.items.length
        };
        res.json({ success: true, data: savedCart.items, status });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message, msg: "Server failed to from product from cart." });
    }
}