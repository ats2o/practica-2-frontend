import React, { useState } from 'react';
import api from '../services/api';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/login', formData);
            localStorage.setItem('token', response.data.token);
            console.log('Login successful');
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <input name="username" onChange={handleChange} placeholder="Username" />
            <input name="password" type="password" onChange={handleChange} placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;