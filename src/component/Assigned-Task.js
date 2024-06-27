import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import { baseUrl } from '../Urls';

const AssignedTask = () => {
    const [assignedTasks, setAssignedTasks] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const userId = JSON.parse(localStorage.getItem('user'))._id;

    useEffect(() => {
        fetchAssignedTasks();
    }, []);

    // Fetch assigned tasks from the server
    const fetchAssignedTasks = async () => {
        try {
            const userId = JSON.parse(localStorage.getItem('user'))._id;
            const response = await fetch(`${baseUrl}/assigned-tasks?userId=${userId}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            const data = await response.json();
            setAssignedTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error.message);
        }
    };

    // Handle task progress update
    const handleProgressUpdate = async (assignedTaskId, isCompleted) => {
        try {
            // Get the ID of the currently logged-in user
            const loggedInUserId = JSON.parse(localStorage.getItem('user'))._id;

            // Find the task in the assignedTasks state
            const updatedTaskIndex = assignedTasks.findIndex(assigntask => assigntask._id === assignedTaskId);
            const updatedTask = assignedTasks[updatedTaskIndex];

            // Check if the currently logged-in user matches the userId of the task
            if (loggedInUserId === updatedTask.userId._id) {
                // Proceed with the progress update
                const response = await fetch(` ${baseUrl}/assigntasks/${assignedTaskId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                    },
                    body: JSON.stringify({ isCompleted: !isCompleted })
                });
                if (!response.ok) {
                    throw new Error('Failed to update task progress');
                }
                // Update the task in the assignedTasks state
                updatedTask.isCompleted = !isCompleted;
                const updatedTasks = [...assignedTasks];
                updatedTasks[updatedTaskIndex] = updatedTask;
                setAssignedTasks(updatedTasks);
                toast.success('Task completed successfully!');
            } else {
                console.log('Permission denied: You are not authorized to update this task.');
            }
        } catch (error) {
            console.error('Error updating task progress:', error.message);
        }
    };

    // Handle search
    const searchHandle = async (event) => {
        const key = event.target.value;
        setSearchKey(key);
        if (key) {
            try {
                const response = await fetch(`${baseUrl}/searchassigntask/${userId}/${key}`, {
                    headers: {
                        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to search tasks');
                }
                const result = await response.json();
                setAssignedTasks(result);
            } catch (error) {
                console.error('Error searching tasks:', error.message);
            }
        } else {
            fetchAssignedTasks();
        }
    };

    return (
        <motion.div
            className='Assignedtask-container'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <input type='search' placeholder='Search.........' id='search' value={searchKey} onChange={searchHandle} />
            <h1>View Assigned-Tasks</h1>
            <div className='assign-task-list'>
                {assignedTasks.map(task => (
                    <motion.div
                        key={task._id}
                        className='assign-task-item'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        <h3>{task.title}</h3>
                        <hr></hr>
                        <p><strong>Task Description: </strong>{task.description}</p>
                        <hr></hr>
                        <p><strong>Assigned To:</strong> {task.userId.name}</p>
                        <hr></hr>
                        <p><strong>Assigned By:</strong> {task.assignedBy.name}</p>
                        <hr></hr>
                        <p><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</p>
                        <hr></hr>
                        <p><strong>Created At:</strong> <strong>{new Date(task.createdAt).toLocaleString()}</strong></p>
                        <hr></hr>
                        {!task.isCompleted ? (
                            <label className='progress'>
                                <input
                                    className='checkbox'
                                    type="checkbox"
                                    checked={task.isCompleted}
                                    onChange={() => handleProgressUpdate(task._id, task.isCompleted)}
                                />
                                <strong>    Mark as Completed</strong>
                            </label>
                        ) : (
                            <p><strong>Task Completed</strong></p>
                        )}

                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default AssignedTask;
