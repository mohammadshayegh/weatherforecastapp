import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://api.weatherapi.com/v1",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export { apiClient };
