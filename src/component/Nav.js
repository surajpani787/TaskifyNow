import React from "react";
import { FaBars } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Initialize menu state
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();

    const signout = () => {
        localStorage.clear();
        toast.success('Successfully signed out!');
        navigate('/')
    }

    return (
        <div className="nav-continer">
            <nav>
                <span>Taskify-Now</span>
                <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <ImCross /> : <FaBars />}
                </div>
                {auth ? <ul className={isMenuOpen ? "nav-links-isMenuOpen" : "nav-links"} onClick={() => setIsMenuOpen(false)}>
                    <li><NavLink to="/task-detail">View-Task</NavLink></li>
                    <li><NavLink to="/assigned-tasks">Assigned</NavLink></li>
                    <li><NavLink to="/task">Crete-Task</NavLink></li>
                    <li><NavLink to="/assign-task">Assign-Task</NavLink></li>
                    <li><NavLink onClick={signout} to="/signup">Sign-Out ({JSON.parse(auth).name})</NavLink></li>
                </ul>
                    :
                    <ul className={isMenuOpen ? "nav-links-isMenuOpen" : "nav-links"}>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/about">About</NavLink></li>
                        <li><NavLink to="/signin">Sign-In</NavLink></li>
                        <li><NavLink to="/signup">Sign-Up</NavLink></li>
                    </ul>

                }
            </nav>
        </div >
    )
}

export default Nav;