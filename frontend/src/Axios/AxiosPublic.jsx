import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";


export const axiosPublic = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
});


export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true 
});