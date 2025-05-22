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

export const createProject = async (body) => {
    try {
        // Transform the data to match the schema
        const projectData = {
            title: body.title,
            area: body.area,
            objectives: body.objectives,
            dateStart: body.schedule.startDate,
            dateEnd: body.schedule.endDate,
            budget: body.budget,
            institution: body.institution,
            team: body.teamMembers,
            comments: body.observations,
            status: 'Formulación' // Default status as per schema
        };

        const response = await api.post("/project/create", projectData);
        return response.data;
    } catch (error) {
        console.log('Error creating project:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Error al crear el proyecto'
        };
    }
}

export const getAllProjects = async () => {
    try {
        const response = await api.get("/project/all");
        return {
            success: true,
            data: response.data,
            message: "Proyectos obtenidos correctamente"
        };
    } catch (error) {
        console.log('Error fetching projects:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Error al obtener los proyectos'
        };
    }
}

