import axios from "axios";

// Base API
export const api = axios.create({
  baseURL: "http://localhost:8081",
});

// Image API
export const imageApi = axios.create({
  baseURL: "http://localhost:8081/api/image",
});

// Video API
export const videoApi = axios.create({
  baseURL: "http://localhost:8081/api/videos",
});
