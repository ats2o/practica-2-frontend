// Importa React y el hook useState desde la librería 'react'
import React, { useState } from 'react';
// Importa el objeto 'api' desde el archivo de servicios
import api from '../services/api';

// Define el componente funcional 'Vote' que recibe 'pageId' como prop
const Vote = ({ pageId }) => {
    // Declara un estado local 'review' con su función 'setReview' para actualizarlo
    const [review, setReview] = useState('');
    // Define la función 'handleChange' que se ejecuta cuando el valor del textarea cambia
    const handleChange = (e) => {
        // Actualiza el estado 'review' con el valor actual del textarea
        setReview(e.target.value);
    };
    // Define la función 'handleVote' que se ejecuta cuando se envía el formulario
    const handleVote = async (e) => {
        // Previene el comportamiento por defecto del formulario (recargar la página)
        e.preventDefault();
        try {
            // Envía una solicitud PATCH a la API para votar, pasando 'review' en el cuerpo de la solicitud
            await api.patch(`/page/${pageId}/vote`, { review });
            // Muestra una alerta indicando que el voto se envió correctamente
            alert('Vote submitted successfully!');
        } catch (error) {
            // Muestra un error en la consola si la solicitud falla
            console.error('Error submitting vote:', error);
            // Muestra una alerta indicando que el envío del voto falló
            alert('Failed to submit vote. Please try again.');
        }
    };
    // Renderiza el formulario de votación
    return (
        <form onSubmit={handleVote}>
            <div>
                <label>
                    Review (optional):
                    <textarea value={review} onChange={handleChange} />
                </label>
            </div>
            <button type="submit">Vote</button>
        </form>
    );
};

// Exporta el componente 'Vote' para que pueda ser utilizado en otros archivos
export default Vote;