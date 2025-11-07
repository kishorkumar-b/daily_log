import axios from "axios";

const api = axios.create({
  //baseURL: `${window.location.origin}/fuel-tracker-0.0.1-SNAPSHOT`,
  baseURL:"http://localhost:8080",
});

export default api;
