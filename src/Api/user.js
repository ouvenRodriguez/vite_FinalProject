import axios from 'axios';
import { API_URL } from '../config.js';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `${localStorage.getItem('@token')}` || ""
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

export const createDocente = async (body) => {
    try {
        const response = await api.post("/user/create-professor", body);
        return response.data;
    } catch (error) {
        console.log('Error fetching user:', error);
        return{
            success: false,
            message: 'Error al crear docente'
        };
    }
}

export const getAllProfessors = async () => {
    try {
        const response = await api.get("/user/all/professors");

        // Hacer la petición con el token
        return response.data;
    } catch (error) {
        console.log('Error fetching professors:', error);
        return {
            success: false,
            message: 'Error al obtener los docentes'
        };
    }
}

export const createEstudiante = async (body) => {
    try {
        const response = await api.post("/user/create-student", body);

        // Hacer la petición con el token
        return response.data;
    } catch (error) {
        console.log('Error fetching user:', error);
        return{
            success: false,
            message: 'Error al crear estudiante'
        };
    }
}

export const getAllStudents = async () => {
    try {
        const response = await api.get("/user/all/students");

        // Hacer la petición con el token
        return response.data;   
    } catch (error) {
        console.log('Error fetching students:', error);
        return {
            success: false,
            message: 'Error al obtener los estudiantes'
        };
    }
}

export const updateUser = async (userId, body) => {
    try {
        const response = await api.put(`/user/update/${userId}`, body);
        return response.data;
    } catch (error) {
        console.log('Error fetching user:', error);
        return{
            success: false,
            message: 'Error al actualizar el docente'
        };
    }
}

export const deleteUser = async (userId) => {
    try {
        const response = await api.delete(`/user/delete/${userId}`);
        return response.data;
    } catch (error) {
        console.log('Error fetching user:', error);
        return{
            success: false, 
            message: 'Error al eliminar el docente'
        };
    }
}





