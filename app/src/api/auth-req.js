import axios from "axios";

axios.defaults.baseURL = "https://ishoppy.onrender.com/api"
axios.defaults.withCredentials = true;

export const loggingUser = async (body,endpoint) => {
    try {
        const res = await axios.post("/auth/"+endpoint, body);
        return res.data
    } catch (error) {
        if (error.status===400) return error.response.data
    }
}

export const logout = async () => {
    try {
        const res = await axios.get("/auth/logout");
        return res.status;
    } catch (error) {
        return error
    }
}

export const verifyStatus = async () => {
    try {
        const res = await axios.get("/auth/reload");
        return res.data
    } catch (error) {
        return error
    }
}