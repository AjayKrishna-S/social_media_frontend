import axios from "axios";

export const makeRequest = axios.create({
    baseURL:"https://social-media-backend-y14s.onrender.com/api/",
    withCredentials: "true",
});