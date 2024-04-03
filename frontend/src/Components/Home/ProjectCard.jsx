import React, { useState } from 'react';
import { Box, Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import axios from 'axios';
import NavBar from '../Navbar';
import Singleproject from './SingleProject';
import './ProjectCard.css';
import { url } from '../../utils/globalVariable';

const ProjectCard = ({ projects }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [projectsPerPage] = useState(20);
    const indexOfLastproject = currentPage * projectsPerPage;
    const indexOfFirstproject = indexOfLastproject - projectsPerPage;
    const currentprojects = projects.slice(indexOfFirstproject, indexOfLastproject);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const [openDialog, setOpenDialog] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleAddClick = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleSubmit = async (event) => {
        const token = localStorage.getItem('token')
        event.preventDefault();
        try {
            console.log(formData);
            const response = await axios({
                method: 'post',
                url: `http://${url}/projects/create`,
                headers: {
                    'Authorization': "Bearer " + token,
                    'Content-Type': 'application/json'
                },
                data: formData
            });
            console.log(response.data.data);
            window.location.reload();
        } catch (error) {
            console.error('Project Creation failed:', error);
        }
        handleCloseDialog();
    };
    return (
        <Box className='home-page'>
            <NavBar />
            <PlaylistAddIcon fontSize='large' className='add-icon' onClick={handleAddClick} />
            <div className='projects'>
                {currentprojects.map((project, index) => (
                    <div key={index}>
                        < Singleproject project={project} />
                    </div>
                ))}
            </div>
            <div className='pagination'>
                <Button disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}>Prev</Button>
                <Button disabled={indexOfLastproject >= projects.length} onClick={() => paginate(currentPage + 1)}>Next</Button>
                {currentPage !== 1 && (
                    <Button onClick={() => paginate(1)}>Back to Home Page</Button>
                )}
            </div>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Add Project</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                    <TextField label="Title" variant="outlined" name="title" id="title" onChange={handleChange} />
                    <TextField label="Description" name="description" id="description" variant="outlined" onChange={handleChange} />
                </Stack>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button type="submit" onClick={handleSubmit}>Add</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
export default ProjectCard;