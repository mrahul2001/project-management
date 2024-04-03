import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Button, TextField, Stack} from '@mui/material';

import { url } from '../../utils/globalVariable';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
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
            console.log(formData);
            const response = await axios.post(`http://${url}/create`, formData);
            navigate('/')
        } catch (error) {
            console.error('Register failed:', error);
        }
    };
    return (
        <div className="signin-container">
          <h2>Register Page</h2>
          <Stack spacing={2}>
          <TextField label="Username" variant="outlined" name="username" id="username" onChange={handleChange} />
            <TextField label="Email ID" variant="outlined" name="email" id="email" onChange={handleChange} />
            <TextField label="Password" type="password" name="password" id="password" variant="outlined" onChange={handleChange} />
            <Button variant="contained" onClick={handleSubmit}>
              Sign Up
            </Button>
          </Stack>
        </div>
    );
};
export default Register;