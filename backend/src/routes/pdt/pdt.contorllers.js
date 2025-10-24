import jwt from "jsonwebtoken"
import { Products } from "../../database/pdts.schema.js";
import { Cart } from "../../database/users.schemas.js";

export const getAllPdts = async (req, res) => {
    const token = req.cookies.token;
    let userStatus = null;
    if (token) {
        const user = jwt.verify(token, process.env.My_JWT_secret)
        console.log(user)
        try {
            const userCart = await Cart.findOne({ user: user.id });
            if (!userCart) {
                userStatus = { isLogged: true, length: 0 };
            } else {
                userStatus = { isLogged: true, length: userCart.items.length };
            }
        } catch (error) {
            console.log(error.message)
        }
    } else {
        userStatus = { isLogged: false };
    };
    try {
        const foundPdts = await Products.find();
        if (!foundPdts) return res.status(400).json({success:false,msg:"Product not found"})
        res.send({ success: true, data: foundPdts, userStatus });
    } catch (error) {
        res.status(500).json({success:false,msg:error.msg})
    }
}

export const getPdt = async (req, res) => {
    const { id: id } = req.params;
    const { token } = req.cookies;

    let user = null;
    if (token) user = jwt.verify(token, process.env.My_JWT_secret);

    try {
        const foundPdt = await Products.findById(id);
        if (!foundPdt) return res.status(400).json({ success: false, msg: "Product not found" });
        if (user) {
            const cart = await Cart.findOne({ user: user.id });
            if (cart) {
                const existing = cart.items.find(pdt => pdt.product.toString() === foundPdt._id.toString());
                if (existing) {
                    foundPdt.cart = {
                        exists: true,
                        quantity: existing.quantity
                    }
                } else {
                    foundPdt.cart = {
                        exists: false
                    }
                }
            }
        }
        res.json({success:true,data:{...foundPdt._doc,...foundPdt.cart}})
    } catch (error) {
        res.status(500).json({success:false,msg:error.message})
    }
}

export const postPdt = async (req, res) => {
    const { body } = req;

    const newPdt = new Products(body);

    try {
        const savedPdt = await newPdt.save();
        res.status(201).json({success:true,msg:"Product added successfully...."})
    } catch (error) {
        res.status(500).json({success:false,msg:error.message})
    }
}

export const deletePdt = async (req, res) => {
    const { id: id } = req.params;

    try {
        const deletedPdt = await Products.findByIdAndDelete(id);
        if (!deletedPdt) return res.status(400).json({success:false,msg:"Product not found"})
        res.send({success:true,msg:"Product deleted successfully...."})
    } catch (error) {
        res.status(500).json({success:false,msg:error.message})
    }
}