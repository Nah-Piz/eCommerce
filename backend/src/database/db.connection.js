import mongoose from "mongoose";

async function ConnectDatabase() {
    try {
        await mongoose.connect("mongodb://localhost:27017/NaNaShop")
        console.log("DB connected successfully.")
    } catch (error) {
        console.log(error)
    }
}

export default ConnectDatabase; 