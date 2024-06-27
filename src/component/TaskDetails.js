import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import { baseUrl } from '../Urls';

const TaskDetails = () => {
    const [tasks, setTasks] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const userId = JSON.parse(localStorage.getItem('user'))._id;

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const userId = JSON.parse(localStorage.getItem('user'))._id;
            const response = await fetch(`${baseUrl}/tasks?userId=${userId}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error.message);
        }
    };

    const handleProgressUpdate = async (taskId, isCompleted) => {
        try {
            const response = await fetch(`${baseUrl}/tasks/${taskId}`, {
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
            // Update local tasks state with updated task progress
            const updatedTask = tasks.find(task => task._id === taskId);
            updatedTask.isCompleted = !isCompleted;
            setTasks([...tasks.filter(task => task._id !== taskId), updatedTask]);
            toast.success('Task completed successfully!');
        } catch (error) {
            console.error('Error updating task progress:', error.message)
        }
    };

    const searchHandle = async (event) => {
        const key = event.target.value;
        setSearchKey(key);
        if (key) {
            try {
                const response = await fetch(`${baseUrl}/searchtask/${userId}/${key}`, {
                    headers: {
                        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to search tasks');
                }
                const result = await response.json();
                setTasks(result);
            } catch (error) {
                console.error('Error searching tasks:', error.message);
            }
        } else {
            fetchTasks();
        }
    };


    const deleteTask = async (id) => {
        let result = await fetch(`${baseUrl}/remove-task/${id}`, {
            method: "delete",
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        toast.success('Task deleted successfully!');
        result = await result.json()
        if (result) {
            fetchTasks();
        }
    };


    return (
        <motion.div
            className='Dashboard-container'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <input type='search' placeholder='Search.........' id='search' value={searchKey} onChange={searchHandle} />
            <h1>View-Tasks</h1>
            <div className='Tasks-list'>
                {tasks.map(task => (
                    <motion.div
                        key={task._id}
                        className='Task-item'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3>{task.title}</h3>
                        <hr></hr>
                        <p><strong>Task Description: </strong> {task.description}</p>
                        <hr></hr>
                        <p><strong>Deadline: </strong> {new Date(task.deadline).toLocaleDateString()}</p>
                        <hr></hr>
                        <p><strong>Created At: </strong> <strong>{new Date(task.createdAt).toLocaleString()}</strong></p>
                        <hr></hr>
                        {!task.isCompleted ? (
                            <label className='progress'>
                                <input
                                    type="checkbox"
                                    checked={task.isCompleted}
                                    onChange={() => handleProgressUpdate(task._id, task.isCompleted)}
                                />
                                <strong>Mark as Completed</strong>
                            </label>
                        ) : (
                            <p><strong>Task Completed</strong></p>
                        )}
                        <hr />
                        <div className='button-task'>
                            <NavLink to={"/updatetask/" + task._id} className="btn">Update</NavLink>
                            <button onClick={() => deleteTask(task._id)} className='btn-delete'>Delete</button>
                        </div>


                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default TaskDetails;
