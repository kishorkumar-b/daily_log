import axios from "axios";
export const imageApi = axios.create({
  baseURL: "http://localhost:8081/api/image",
});

export const videoApi = axios.create({
  baseURL: "http://localhost:8081/api/videos",
});
