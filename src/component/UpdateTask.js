import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../Urls';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const params = useParams();
    const navigate = useNavigate();


    const clearForm = () => {
        setTitle("");
        setDescription("");
        setDeadline("");
    };

    useEffect(() => {
        getUpdatetask();
    }, []);

    const getUpdatetask = async () => {
        let result = await fetch(`${baseUrl}/update-task/${params.id}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        setTitle(result.title)
        setDescription(result.description)
        setDeadline(result.deadline)
    }

    const UpdateTask = async (e) => {
        e.preventDefault();
        let result = await fetch(`${baseUrl}/update/${params.id}`, {
            method: "PUT",
            body: JSON.stringify({ title, description, deadline }),
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
        })
        result = await result.json();
        toast.success('Task-Updated successfully!');
        clearForm();
        console.warn(result)
        navigate('/task-detail');
    }



    return (
        <motion.div
            className='Task-container'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1>Edit-Task</h1>
            <motion.form
                onSubmit={UpdateTask}
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
                <button type='submit'>Update-Task</button>
            </motion.form>
        </motion.div>
    );
};

export default TaskForm;
