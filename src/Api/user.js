import axios from 'axios';
import { API_URL } from '../config.js';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `${localStorage.getItem('token')}` || ""
    }
});

export const register = async (body) => {
    try {
        const response = await api.post("/user/register", body);
        return response.data;
    } catch (error) {
        
        console.log('Error fetching user:', error);
        return{
            success: false,
            message: 'Error al interntar registarse'
        };
    }
}

export const login = async (body) => {
    try {
        const response = await api.post("/user/login", body);
        return response.data;
    } catch (error) {
        console.log('Error fetching user:', error);
        return{
            success: false,
            message: 'Error al interntar iniciar sesion'
        };
    }
}