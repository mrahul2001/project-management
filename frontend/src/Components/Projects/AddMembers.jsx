import React, { useState } from 'react';
import { Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import axios from 'axios';

const AddMembers = ({ title }) => {
    const [openDialog, setOpenDialog] = useState(false);

    const [formData, setFormData] = useState({
        projectName: '',
        memberEmail: ''
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
            const response = await axios({
                method: 'post',
                url: `http://localhost:5000/projects/add-member`,
                headers: {
                    'Authorization': "Bearer " + token,
                    'Content-Type': 'application/json'
                },
                data: formData
            });
            window.location.reload();
        } catch (error) {
            console.error('Project Creation failed:', error);
        }
        handleCloseDialog();
    };
    return (
        <div>
            <PlaylistAddIcon fontSize='large' className='add-icon' onClick={handleAddClick} />
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Add Member</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <TextField label="Project Name" variant="outlined" name="projectName" id="projectName" onChange={handleChange} />
                            <TextField label="Email" variant="outlined" name="memberEmail" id="memberEmail" onChange={handleChange} />
                        </Stack>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button type="submit" onClick={handleSubmit}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddMembers
