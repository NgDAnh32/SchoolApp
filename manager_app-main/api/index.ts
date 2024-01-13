import axios from "axios";

export const BASE_USRL = 'http://192.168.11.108:5000/api';
export const api = axios.create({
    baseURL: BASE_USRL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  