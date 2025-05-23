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
        return response.data;
    } catch (error) {
        console.log('Error fetching projects:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Error al obtener los proyectos'
        };
    }
}

export const updateProject = async (projectId, body) => {
    try {
        const projectData = {
            title: body.title,
            area: body.area,
            objectives: body.objectives,
            dateStart: body.schedule.startDate,
            dateEnd: body.schedule.endDate,
            budget: body.budget,
            institution: body.institution,
            team: body.teamMembers,
            comments: body.observations
        };

        const response = await api.put(`/project/update/${projectId}`, projectData);
        return response.data;
    } catch (error) {
        console.log('Error updating project:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Error al actualizar el proyecto'
        };
    }
}

export const deleteProject = async (projectId) => {
    try {
        const response = await api.delete(`/project/delete/${projectId}`);
        return response.data;
    } catch (error) {
        console.log('Error deleting project:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Error al eliminar el proyecto'
        };
    }
}