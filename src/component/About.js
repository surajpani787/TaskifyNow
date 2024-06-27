import React from 'react';
import Footer from './Footer';
import featureImage1 from '../images/featureImage1.jpg';
import featureImage2 from '../images/featureImage2.jpg';
import featureImage3 from '../images/featureImage3.jpg'

const AboutPage = () => {
    return (
        <div>
            <header>
                <div className='intro'>
                    <h1>About TaskifyNow</h1>
                    <p>TaskifyNow is a streamlined task management platform designed to simplify your workflow and enhance productivity. With intuitive features and user-friendly interface, TaskifyNow empowers individuals and teams to efficiently organize tasks, track progress, and collaborate seamlessly. Whether you're a freelancer, a small business owner, or part of a large organization, TaskifyNow provides the tools you need to stay organized, focused, and on top of your goals. Say goodbye to scattered to-do lists and hello to a more productive way of working with TaskifyNow. </p>
                </div>
            </header>

            <section id="features">
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
            </section>

            <Footer />
        </div>
    );
};

export default AboutPage;
