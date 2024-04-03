import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import './Login.css'; 
import { url } from '../../utils/globalVariable';

const SignIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://${url}/login`, formData);
            localStorage.setItem('token', response.data.data);
            navigate('/');
        } catch (error) {
            alert('Wrong Credentials');
            console.error('Sign-in failed:', error);
        }
    };
    return (
        <div className="signin-container">
            <h2>Login Page </h2>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField label="Username" variant="outlined" name="username" id="username" onChange={handleChange} />
                    <TextField label="Password" type="password" name="password" id="password" variant="outlined" onChange={handleChange} />
                    <Button variant="contained" type="submit">
                        Login
                    </Button>
                </Stack>
            </form>
        </div>
    );
};
export default SignIn;