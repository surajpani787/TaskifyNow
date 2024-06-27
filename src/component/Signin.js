import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from 'react-toastify';
import Footer from "./Footer";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import { baseUrl } from "../Urls";

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/task-detail');
        }
    }, [navigate]);

    const signinhandle = async () => {
        console.warn("email,password", email, password);
        let response = await fetch(`${baseUrl}/signin `, {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        let result = await response.json();
        console.warn(result);

        if (result.auth) {
            const userName = result.user.name; // Assuming the user object has a 'name' property
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));
            toast.success(`Welcome back ${userName}, you have successfully signed in!`);
            navigate("/task-detail");
        } else {
            toast.error("Please enter a valid email and password.");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <motion.div
                className="signin-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1>Sign-In</h1>
                <motion.div
                    className="form"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <label>Email:</label>
                    <input type="email" name="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </motion.div>
                <motion.div
                    className="form"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <label>Password:</label>
                    <div className="password-input-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span onClick={togglePasswordVisibility} className="password-toggle-icon">
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </motion.div>

                <motion.div
                    className="check"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <input type="checkbox" id="rememberMe" placeholder="Remember Me" />
                    <span>Remember Me</span>
                </motion.div>
                <button
                    className="signinbtn"
                    type="button"
                    onClick={signinhandle}
                >
                    Sign-In
                </button>
                <Link
                    to="/password-Reset"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                >
                    Forget-Password?
                </Link>
            </motion.div>
            <Footer />
        </div>
    );
}

export default Signin;
