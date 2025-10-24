import axios from "axios"

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://ishoppy.onrender.com"

export const AddCartItem = async (product,quantity) => {
    const body = { product,quantity }
    try {
        const res = await axios.post("/cart/", body);
        return res.data;
    } catch (error) {
        console.log(error)
        if (error.status === 401 || error.status === 500) return { msg: error.response.data.msg };
    }
}

export const GetAllCart = async () => {
    try {
        const res = await axios.get("/cart/");
        return res.data
    } catch (error) {
        return { msg: error.response.data.msg };
    }
}

export const RemoveCart = async (id) => {
    try {
        const res = await axios.delete("/cart/" + id);
        return res.data;
    } catch (error) {
        return { msg: error.response.data.msg };
    }
}