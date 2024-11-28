// Importa React y el hook useState desde la biblioteca de React
import React, { useState } from 'react';
// Importa los componentes.
import Register from './Register';
import Login from './Login';
import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';
// Importa la biblioteca styled-components para estilos
import styled from 'styled-components';
// Importa el archivo de estilos CSS
import '../Estilos.css';

// Define un contenedor estilizado usando styled-components
const Container = styled.div`
    padding: 20px;
    max-width: 600px;
    margin: auto;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
`;

// Define el componente funcional RegistrationForm
const RegistrationForm = () => {
    // Define el estado 'step' para controlar el paso actual del formulario
    const [step, setStep] = useState(0);
    // Define el estado 'formData' para almacenar los datos del formulario
    const [formData, setFormData] = useState({});
    // Define el estado 'message' para mostrar mensajes al usuario
    const [message, setMessage] = useState('');
    // Función para avanzar al siguiente paso y actualizar los datos del formulario
    const nextStep = (data) => {
        setFormData({ ...formData, ...data });
        setStep(step + 1);
    };
    // Función para retroceder al paso anterior
    const prevStep = () => {
        setStep(step - 1);
    };
    // Función para enviar el formulario
    const submitForm = async () => {
        try {
            // Realiza una solicitud POST a la API para registrar los datos
            const response = await fetch('http://localhost:3001/api/register', { // Ensure this URL is correct and the server is running
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            // Verifica si la respuesta no es exitosa
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error en el envío de datos: ${errorText}`);
            }
            // Convierte la respuesta a JSON
            const result = await response.json();
            // Muestra un mensaje de éxito
            setMessage('Registro exitoso');
            console.log('Registro exitoso:', result);
        } catch (error) {
            // Muestra un mensaje de error
            setMessage('Error al registrar');
            if (error.name === 'TypeError') {
                setMessage('Error de red. Por favor, inténtelo de nuevo más tarde.');
            } else {
                setMessage('Error en el envío de datos. Por favor, revise los datos ingresados.');
            }
            console.error('Error al enviar los datos:', error);
        }
    };
    // Renderiza el formulario basado en el paso actual
    return (
        <Container>
            {step === 0 && <Register onNext={nextStep} />}
            {step === 1 && (
                <>
                    <Login onNext={nextStep} />
                    <button onClick={prevStep}>Atrás</button>
                </>
            )}
            {step === 2 && (
                <>
                    <UpdateUser onNext={nextStep} />
                    <button onClick={prevStep}>Atrás</button>
                </>
            )}
            {step === 3 && (
                <div>
                    <DeleteUser />
                    <button onClick={prevStep}>Atrás</button>
                </div>
            )}
            {step === 4 && (
                <div>
                    <h2>Resumen de Registro</h2>
                    <pre>{JSON.stringify(formData, null, 2)}</pre>
                    <button onClick={submitForm}>Enviar Registro</button>
                    <button onClick={prevStep}>Atrás</button>
                </div>
            )}
            {message && <div>{message}</div>}
        </Container>
    );
};

// Exporta el componente RegistrationForm como el valor por defecto
export default RegistrationForm;