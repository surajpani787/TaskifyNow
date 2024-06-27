import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Footer from './Footer';
import Hero from '../images/hero1.jpg';
import featureImage1 from '../images/featureImage1.jpg';
import featureImage2 from '../images/featureImage2.jpg';
import featureImage3 from '../images/featureImage3.jpg';
import User1 from '../images/user1.jpg';
import User2 from '../images/user2.jpg';
import User3 from '../images/user3.jpg';

const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
};

const Homepage = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <header>
                <h1>Welcome to TaskifyNow</h1>
                <p>A simple and efficient task management platform</p>
                <button>Get Started</button>
            </header>

            <section id="hero">
                <div>
                    <img src={Hero} alt="Feature 1" />
                </div>
                <div>
                    <h2>Effortlessly manage your tasks</h2>
                    <p>Stay organized and productive with TaskifyNow</p>
                </div>
            </section>

            <motion.section id="features" ref={ref} variants={sectionVariants}>
                <h2>Key Features</h2>
                <div id='feature-details'>
                    <div className="feature">
                        <img src={featureImage1} alt="Feature 1" />
                        <h3>Task Creation</h3>
                        <p>Create and assign tasks with ease and be uptodate.</p>
                    </div>
                    <div className="feature">
                        <img src={featureImage2} alt="Feature 2" />
                        <h3>Progress Tracking</h3>
                        <p>Track the progress of your tasks in real-time.</p>
                    </div>
                    <div className="feature">
                        <img src={featureImage3} alt="Feature 3" />
                        <h3>Collaboration</h3>
                        <p>Collaborate with team members seamlessly.</p>
                    </div>
                </div>
            </motion.section>

            <motion.section id="how-it-works" ref={ref} variants={sectionVariants}>
                <h2>How It Works</h2>
                <p>TaskifyNow is a sophisticated task management platform designed to streamline workflows and enhance productivity for individuals and teams alike. Its intuitive interface and robust features empower users to effortlessly organize, prioritize, and collaborate on tasks with precision and efficiency.</p>

                <p> 1.<strong>Task Creation and Assignment:</strong> Users can easily create new tasks, specifying details such as due dates, priorities, and descriptions. With TaskifyNow's seamless assignment feature, tasks can be delegated to team members with just a few clicks, ensuring clear ownership and accountability.</p>

                <p> 2. <strong>Real-Time Progress Tracking</strong>: Stay informed and in control with TaskifyNow's real-time progress tracking capabilities. Monitor task status, updates, and deadlines at a glance, allowing for quick adjustments and informed decision-making.</p>

                <p>3. <strong>Collaboration Made Simple:</strong> TaskifyNow fosters seamless collaboration among team members by providing a centralized platform for communication and coordination. Through integrated messaging and file sharing functionalities, users can exchange ideas, feedback, and resources effortlessly, driving collaboration to new heights.</p>

                <p>4.<strong>Customizable Workflows:</strong> Tailor TaskifyNow to fit your unique workflow and preferences with customizable features and settings. From task categorization and tagging to personalized notifications and reminders, TaskifyNow adapts to your specific needs, enhancing flexibility and usability.</p>

                <p> 5.<strong>Data Security and Privacy:</strong> TaskifyNow prioritizes the security and privacy of user data, implementing robust encryption protocols and strict access controls to safeguard sensitive information. Users can trust TaskifyNow to protect their data integrity and confidentiality at all times.</p>

                <p>  6. <strong>Intuitive User Experience</strong>: Built with user experience in mind, TaskifyNow offers an intuitive and user-friendly interface that minimizes learning curves and maximizes productivity. Whether you're a seasoned professional or a novice user, TaskifyNow's intuitive design ensures a seamless and enjoyable task management experience.</p>

                <p> 7. <strong>Cross-Platform Accessibility:</strong> Access TaskifyNow anytime, anywhere, and on any device with its cross-platform compatibility. Whether you're on your desktop, laptop, tablet, or smartphone, TaskifyNow provides consistent access to your tasks and collaboration tools, ensuring productivity on the go.</p>

                <p><strong>TaskifyNow</strong> is more than just a task management tool; it's a catalyst for organizational excellence, empowering individuals and teams to achieve their goals with precision, efficiency, and peace of mind.</p>
            </motion.section>

            <motion.section id="testimonials" ref={ref} variants={sectionVariants}>
                <h2>What Our Users Say</h2>
                <div id='user'>
                    <div className="testimonial">
                        <img src={User1} alt="User 1" />
                        <p>"TaskifyNow has revolutionized the way we manage tasks."</p>
                        <p>- John Doe, CEO</p>
                    </div>
                    <div className="testimonial">
                        <img src={User2} alt="User 2" />
                        <p>"An amazing platform that simplifies task management."</p>
                        <p>- Jane Smith, Project Manager</p>
                    </div>
                    <div className="testimonial">
                        <img src={User3} alt="User 2" />
                        <p>"An amazing platform that simplifies task management."</p>
                        <p>- Jane Smith, Project Manager</p>
                    </div>
                </div>
            </motion.section>

            <Footer />
        </motion.div>
    );
};

export default Homepage;
