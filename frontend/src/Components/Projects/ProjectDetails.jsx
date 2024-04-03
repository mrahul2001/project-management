import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import './ProjectDetails.css'

const ProjectDetails = ({ title }) => {
  const [project, setProject] = useState(null);
  const [owner, setOwner] = useState({});
  const [showIcon, setShowIcon] = useState(false);
  const navigate = useNavigate();

  async function fetchProduct() {
    try {
      const response = await axios({
        method: 'post',
        url: `http://localhost:5000/projects/get`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: { title }
      });
      setProject(response.data.data)
    } catch (error) {
      console.error('Project Fetching failed:', error);
    }
  }

  async function getOwnerOfProject() {
    const token = localStorage.getItem('token');
    try {
      const response = await axios({
        method: 'get',
        url: `http://localhost:5000/get-details`,
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      });
      setOwner(response.data.data);
    } catch (error) {
      console.error('Project Fetching failed:', error);
    }
  }

  const handleTasks = () => {
    navigate(`/project/${title}/tasks`)
  }

  useEffect(() => {
    async function fetchData() {
      await fetchProduct();
      await getOwnerOfProject();
    }
    fetchData();
  }, []);

  if (!project) {
    return (
      <h1>Loading....</h1>
    )
  }
  return (
    <div>
      <Box mt={4} mx="auto" maxWidth={600}>
        <Paper elevation={3} sx={{ padding: 3, backgroundColor: '#f7f7f7', borderRadius: '10px' }} className="project-details">
          <Typography variant="h4" gutterBottom className="title">
            {project.title}
          </Typography>
          {/* <Typography variant="body1" gutterBottom className="description">
            <strong>Description:</strong> {project.description}
          </Typography> */}
          <Typography variant="body1" gutterBottom className="owner">
            <strong>Owner:</strong> {project.owner}
          </Typography>
          <Typography variant="body1" gutterBottom className="createdAt">
            <strong>Created At:</strong> {project.createdAt}
          </Typography>
          <Typography variant="body1" gutterBottom className="updatedAt">
            <strong>Updated At:</strong> {project.updatedAt}
          </Typography>
          <Typography variant="h5" gutterBottom className="members-heading">
            Project Members
          </Typography>
          {project.members.length > 0 ? (
            <ul className="members-list">
              {project.members.map((member, index) => (
                <li key={index} className="member">
                  {member}
                </li>
              ))}
            </ul>
          ) : (
            <Typography variant="body1" gutterBottom className="no-members">
              No members yet
            </Typography>
          )}
          {(owner.email === project.owner || project['members'].includes(owner.email) )&&<Button variant="contained" onClick={handleTasks} className="see-tasks-btn">See Tasks</Button>}
        </Paper>
      </Box>
    </div>
  )
}

export default ProjectDetails;
