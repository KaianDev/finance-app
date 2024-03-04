import axios from "axios";
export const frontendApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FRONTEND_API,
  headers: {
    "Content-Type": "application/json"
  }
});

export const backendApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  headers: {
    "Content-Type": "application/json"
  }
});
