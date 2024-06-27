import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../Urls';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const navigate = useNavigate();

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setDeadline("");
  };

  const handleTaskCreation = async (e) => {
    e.preventDefault();

    try {
      const userId = JSON.parse(localStorage.getItem('user'))._id;
      const result = await fetch(`${baseUrl}/create-task`, {
        method: 'POST',
        body: JSON.stringify({ title, description, deadline, userId }),
        headers: {
          'Content-Type': 'application/json',
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        },
      });

      if (!result.ok) {
        throw new Error('Failed to create task');
      }

      const data = await result.json();
      navigate('/task-detail')
      console.warn(data);
      clearForm();
      toast.success('Task-created successfully!');
    } catch (error) {
      console.error('Error creating task:', error.message);
    }
  };

  return (
    <motion.div
      className='Task-container'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Create Task</h1>
      <motion.form
        onSubmit={handleTaskCreation}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="form">
          <label>Enter Task Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter task name' />
        </div>
        <div className='form'>
          <label>Enter Your Task Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Write description about the task' />
        </div>
        <div className='form'>
          <label>Enter Your Task Deadline:</label>
          <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} placeholder='Select deadline' />
        </div>
        <button type="submit">Create Task</button>
      </motion.form>
    </motion.div>
  );
};

export default TaskForm;
