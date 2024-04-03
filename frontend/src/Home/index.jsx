import React, { useState, useEffect }  from 'react';
import NavBar from '../Components/Navbar';
import axios from 'axios';
import ProjectCard from '../Components/Home/ProjectCard';

import './Home.css'
import LandingPage from '../Components/Home/LandingPage';

const Index = () => {
    const [projects, setProjects] = useState([]);
    const isLoggedIn = !!localStorage.getItem('token');
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:5000/projects/get-all', {}, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                setProjects(response.data.data);
            } catch(error) {
                console.log(error);
            }
        };
        if (isLoggedIn) {
            fetchProjects();
        }
    }, [isLoggedIn]); 
    console.log(projects);

    return (
        <div>
            <NavBar/>
            {isLoggedIn ? (
                <ProjectCard projects={projects}/>
            ) : (
                <div className='LandingPage'>
                    <LandingPage />
                </div>
            )}
        </div>
    );
}
export default Index;