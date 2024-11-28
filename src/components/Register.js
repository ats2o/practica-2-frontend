// Importa React y el hook useState desde la biblioteca de React
import React, { useState } from 'react';
// Importa el servicio api desde el archivo api.js ubicado en la carpeta services
import api from '../services/api';

// Define el componente funcional Register
const Register = () => {
    // Declara el estado formData con useState, inicializándolo con un objeto que tiene las propiedades username y password vacías
    const [formData, setFormData] = useState({ username: '', password: '' });
    // Define la función handleChange que se ejecuta cuando hay un cambio en los inputs del formulario
    const handleChange = (e) => {
        // Actualiza el estado formData con el nuevo valor del input correspondiente
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    // Define la función handleSubmit que se ejecuta cuando se envía el formulario
    const handleSubmit = async (e) => {
        // Previene el comportamiento por defecto del formulario (recargar la página)
        e.preventDefault();
        try {
            // Envía una solicitud POST a la ruta /register con los datos del formulario
            const response = await api.post('/register', formData);
            // Muestra la respuesta en la consola
            console.log(response.data);
        } catch (error) {
            // Muestra el error en la consola si la solicitud falla
            console.error(error);
        }
    };
    // Retorna el JSX que define la estructura del formulario de registro
    return (
        <form onSubmit={handleSubmit}>
            {/* Título del formulario */}
            <h2>Registrate aquí</h2>
            {/* Input para el nombre de usuario */}
            <input name="username" onChange={handleChange} placeholder="Nombre de usuario" />
            <h1>  </h1>
            {/* Input para la contraseña */}
            <input name="password" type="password" onChange={handleChange} placeholder="Contraseña" />
            <h1>  </h1>
            {/* Botón para enviar el formulario */}
            <button type="submit">Registra</button>
        </form>
    );
};

// Exporta el componente Register como el valor por defecto del módulo
export default Register;