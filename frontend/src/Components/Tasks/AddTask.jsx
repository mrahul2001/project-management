import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem } from '@mui/material';
import { grey } from '@mui/material/colors';


const AddTask = () => {
  const { title } = useParams();
  const [openDialog, setOpenDialog] = useState(false);

  const [formData, setFormData] = useState({
    projectName: title,
    taskName: '',
    taskDescription: '',
    taskCategory: '',
    assignedMember: '',
    memberRole: ''
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
        url: `http://localhost:5000/tasks/create`,
        headers: {
          'Authorization': "Bearer " + token,
          'Content-Type': 'application/json'
        },
        data: formData
      });
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
              <TextField label="Project Name" variant="outlined" name="projectName" id="projectName" value={title} disabled={true} />
              <TextField label="Name" variant="outlined" name="taskName" id="taskName" onChange={handleChange} />
              <TextField label="Desciption" variant="outlined" name="taskDescription" id="taskDescription" onChange={handleChange} />
              <Select
                label="Category"
                variant="outlined"
                name="taskCategory"
                id="taskCategory"
                onChange={handleChange}
                style={{color: 'grey'}}
              >
                <MenuItem value="to do">To do</MenuItem>
                <MenuItem value="in progress">In Progress</MenuItem>
                <MenuItem value="in testing">In Testing</MenuItem>
                <MenuItem value="done">Done</MenuItem>
              </Select>
              <TextField label="Member" variant="outlined" name="assignedMember" id="assignedMember" onChange={handleChange} />
              <TextField label="Role" variant="outlined" name="memberRole" id="memberRole" onChange={handleChange} />              

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

export default AddTask
