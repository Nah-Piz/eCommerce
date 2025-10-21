import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        unique: true,
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    }]
});

export const Users = new mongoose.model("Users", userSchema);

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Products"
        },
        quantity: {
            type: Number,
            default: 1,
            min: 1,
            required: true
        }
    }]
});

export const Cart = new mongoose.model("Cart",cartSchema)