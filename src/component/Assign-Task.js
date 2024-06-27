import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../Urls';

const TaskAssignmentForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const userId = JSON.parse(localStorage.getItem('user'))._id;

    const clearForm = () => {
        setUserEmail('');
        setTitle('');
        setDescription('');
        setDeadline('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${baseUrl}/assign-task`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                },
                body: JSON.stringify({
                    title,
                    description,
                    deadline,
                    email: userEmail,
                    assignedBy: userId // Directly store the user ID
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to assign task');
            }
            clearForm();
            setError('');
            navigate("/assigned-tasks");
            setSuccessMessage('Task assigned successfully!');
            toast.success('Task assigned successfully!');
        } catch (err) {
            setSuccessMessage('');
            setError(err.message || 'An error occurred');
        }
    };

    return (
        <motion.div
            className='assign-task'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2>Assign Task</h2>
            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className='form'>
                    <label>Enter Assignee Email:</label>
                    <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} placeholder='Enter asignee email' required />
                </div>
                <div className='form'>
                    <label>Enter Task Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter task title' required />
                </div>
                <div className='form'>
                    <label>Enter Task Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Write the task description' required />
                </div>
                <div className='form'>
                    <label>Deadline:</label>
                    <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
                </div>
                <button type="submit">Assign Task</button>
            </motion.form>
        </motion.div>
    );
};

export default TaskAssignmentForm;
