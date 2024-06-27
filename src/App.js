import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Nav from './component/Nav';
import Home from './component/Home';
import Signup from './component/Signup';
import Signin from './component/Signin';
import About from './component/About';
import PrivateComponent from './component/PrivateComponent';
import TaskForm from './component/TaskForm';
import TaskDetails from './component/TaskDetails';
import AssignTaskForm from './component/Assign-Task';
import AssignedTasks from './component/Assigned-Task';
import UpdateTask from './component/UpdateTask';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <ToastContainer position="top-right" style={{ top: '60px' }} />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/task-detail" element={<TaskDetails />} />
            <Route path="/assigned-tasks" element={<AssignedTasks />} />
            <Route path="/task" element={<TaskForm />} />
            <Route path="/assign-task" element={<AssignTaskForm />} />
            <Route path="/updatetask/:id" element={<UpdateTask />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter >
    </div >
  );
}

export default App;
