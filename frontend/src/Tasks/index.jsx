import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import TasksCategories from '../Components/Tasks/TasksCategories';
import AddTask from '../Components/Tasks/AddTask';

const Tasks = () => {
  const [tasks, setTasks] = useState(null);
  const { title } = useParams();

  const getTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios({
        method: 'post',
        url: `http://localhost:5000/tasks/get-tasks`,
        headers: {
          'Authorization': "Bearer " + token,
          'Content-Type': 'application/json'
        },
        data: { 'projectName': title }
      });
      setTasks(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error('Project Fetching failed:', error);
    }
  }

  useEffect(() => {
    getTasks();
  }, [])

  return (
    <div>
      <TasksCategories tasks={tasks} />
      <AddTask />
      </div>
  );
}

export default Tasks

