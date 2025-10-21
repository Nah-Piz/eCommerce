import axios from "axios";

axios.defaults.baseURL = "http://localhost:2424/api"
axios.defaults.withCredentials = true;

export const loggingUser = async (body,endpoint) => {
    try {
        const res = await axios.post("/auth/"+endpoint, body);
        return res.data
    } catch (error) {
        if (error.status===400) return error.response.data
    }
}

