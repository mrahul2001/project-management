import React, { useState } from 'react';
import { Card, CardActions, CardContent, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import './ProjectCard.css';

const SingleProject = ({ project }) => {
    const navigate = useNavigate();

    const openDescription = () => {
        if (project.id) {
            navigate(`/projects/${project.id}`);
        } else {
            console.error("project ID is undefined");
        }
    }

    const openProjectPage = () => {
        if (project.title) navigate(`/project/${project.title}`);
        else console.error("Undefined Project");

    }

    return (
        <div>
            <Card className="card" sx={{ maxWidth: 345 }}>
                <CardContent className="card-content">
                    <Typography gutterBottom variant="h5" component="div">
                        {project.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" className='text'>
                        {project.projectDescription}
                    </Typography>
                </CardContent>
                <CardActions className='buttonss'>
                    <Button size="small" onClick={openProjectPage}>Open</Button>
                    <Button size="small" onClick={openDescription}>Details</Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default SingleProject;
