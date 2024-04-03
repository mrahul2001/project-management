import React from 'react';
import './LandingPage.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="landing-page-container">
            <div className="text-container">
                <span className="heading">IT TEAMS</span>
                <h1 className="sub-heading">A secure system of record for your enterprise</h1>
                <div className="description">
                    Asana solves many use cases and integrates with existing tools—so there’s no extra work for IT. Connect teams and tools, without compromising security.
                </div>
                <div className="buttons">
                    <Link to="/register">
                        <Button variant="contained">Create an Account</Button>
                    </Link>
                    <Button variant="outlined">Get Started</Button>
                </div>
            </div>
            <img src='/teams-it-hero.png' className="image" alt="IT Teams" />
        </div>
    );
};
export default LandingPage;