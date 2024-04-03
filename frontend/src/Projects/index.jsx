import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import ProjectDetails from '../Components/Projects/ProjectDetails';
import AddMembers from '../Components/Projects/AddMembers';
import NavBar from '../Components/Navbar/index';

import './Projects.css';

const ProjectPage = () => {
  const { title } = useParams();
  const [project, setProject] = useState({});
  const [owner, setOwner] = useState({});
  const [showIcon, setShowIcon] = useState(false);

  async function fetchProduct() {
    try {
      const response = await axios({
        method: 'post',
        url: `http://localhost:5000/projects/get`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: { title },
      });
      setProject(response.data.data);
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

  useEffect(() => {
    async function fetchData() {
      await fetchProduct();
      await getOwnerOfProject();
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (owner.email === project.owner) setShowIcon(true);
    else setShowIcon(false);
  }, [owner, project]);

  return (
    <div className='project-details'>
      <NavBar />
      <ProjectDetails title={title} />
      {showIcon && (
        <div className='add-members-icon' onClick={() => console.log("Add Member clicked")}>
          <AddMembers title={title} />
          <span className="add-members-text">Add Member</span>
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
