import React, { useState, useEffect } from 'react';
import api from '../services/api';

const UpdateUser  = () => {
    const [formData, setFormData] = useState({ username: '', email: '' });
    const [loading, setLoading] = useState(true);
    // Función para manejar los cambios en los campos del formulario
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.put('/user', formData);
            console.log('User  updated:', response.data);
            alert('User  updated successfully!');
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Failed to update user. Please try again.');
        }
    };
    // Función para cargar los datos del usuario al iniciar el componente
    const loadUserData = async () => {
        try {
            const response = await api.get('/registro&#39'); // Asumiendo que hay un endpoint para obtener los datos del usuario
            setFormData({
                username: response.data.username,
                email: response.data.email,
            });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user data:', error);
            alert('Failed to load user data. Please try again.');
        }
    };
    // Cargar los datos del usuario cuando el componente se monta
    useEffect(() => {
        loadUserData();
    }, []);
    if (loading) {
        return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Username:
                    <input 
                        type="text" 
                        name="username" 
                        value={formData.username} 
                        onChange={handleChange} 
                        required 
                    />
                </label>
            </div>
            <div>
                <label>
                    Email:
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                </label>
            </div>
            <button type="submit">Update User</button>
        </form>
    );
};

export default UpdateUser ;