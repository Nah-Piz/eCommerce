import mongoose from "mongoose";

async function ConnectDatabase() {
    try {
        await mongoose.connect(process.env.MongoDB_Connection);
    } catch (error) {
        console.log(error);
    }
}

export default ConnectDatabase; 