import React, { useState } from 'react';
import './TasksCategories.css'
import NavBar from '../Navbar';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';

const TasksCategories = ({ tasks }) => {
  console.log(tasks);
  const taskCategories = ['to do', 'in progress', 'in testing', 'done'];

  const updateTask = async (updatedTask) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios({
        method: 'post',
        url: `http://localhost:5000/tasks/update`,
        headers: {
          'Authorization': "Bearer " + token,
          'Content-Type': 'application/json'
        },
        data: {
          taskID: updatedTask.taskID,
          taskCategory: updatedTask.taskCategory
        }
      });
      console.log('Task updated successfully:', response.data);

      window.location.reload();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      return;
    }

    const updatedTask = {
      taskID: draggableId,
      taskCategory: destination.droppableId
    };
    updateTask(updatedTask);
  };

  return (
    <div className="tasks-container">
      <NavBar />

      <DragDropContext onDragEnd={onDragEnd}>
        {taskCategories.map((category, index) => (
          <div key={index} className={`task-column ${category}`} style={{ marginTop: '60px' }}>
            <h2>{category}</h2>
            <Droppable droppableId={category} key={category}>
              {(provided) => (
                <div className="task-list" {...provided.droppableProps} ref={provided.innerRef}>
                  {tasks
                    ?.filter((task) => task.task_category === category)
                    ?.map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="task-item"
                          >
                            <p>Title: {task.task_name}</p>
                            <p>desc: {task.task_description}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
};

export default TasksCategories;
