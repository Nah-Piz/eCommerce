import mongoose from "mongoose"

const productsShema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    image: {
        required: true,
        type: String,
    },
    price: {
        required: true,
        type: Number,
    },
    keyword: {
        type: String,
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
}
);

export const Products = new mongoose.model("Products", productsShema);
