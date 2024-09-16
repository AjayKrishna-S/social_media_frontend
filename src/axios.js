import axios from "axios";

export const makeRequest = axios.create({
    baseURL:process.env.CONNECTION_URL,
    withCredentials: "true",
});
