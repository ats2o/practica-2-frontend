import React from 'react';
import api from '../services/api';

const DeleteUser  = () => {
    const handleDelete = async () => {
        try {
            await api.delete('/user'); // Asegúrate de que la ruta sea la correcta
            localStorage.removeItem('token'); // Eliminar el token después de la baja
            alert('User  account deleted successfully.');
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Failed to delete user. Please try again.');
        }
    };

    return (
        <div>
            <h2>Delete Account</h2>
            <button onClick={handleDelete}>Delete My Account</button>
        </div>
    );
};

export default DeleteUser ;