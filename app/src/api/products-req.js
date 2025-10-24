import axios from "axios";

// const apiKey = process.env.API_URI;

axios.defaults.withCredentials = true;

// axios.defaults.baseURL = "http://localhost:2424/api"

export async function GetAllPdts() {
    try {
        const response = await axios.get("https://ishoppy.onrender.com/api/pdts");
        return response.data;
    } catch (error) {
        return error.message;
    }
}

export async function GetAPdt(id) {
    try {
        const response = await axios.get("https://ishoppy.onrender.com/api/pdts/"+id);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

export async function SearchPdts(query) {
    try {
        const response = await axios.get("https://ishoppy.onrender.com/api/search/"+query);
        return response.data;
    } catch (error) {
        return error.message;
    }
}