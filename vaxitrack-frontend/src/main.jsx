import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import CreateUser from './pages/CreateUser';
import CreateVaccine from './pages/CreateVaccine';
import DispenseVaccine from './pages/DispenseVaccine';
import UserDashboard from './pages/UserDashboard';
import UserLogin from './pages/UserLogin';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/create-vaccine" element={<CreateVaccine />} />
        <Route path="/dispense-vaccine" element={<DispenseVaccine />} />
        <Route path="/user-dashboard/:userId" element={<UserDashboard />} />
        <Route path="/user-login" element={<UserLogin />} />
        {/* Future routes can be added here */}
      </Routes>
    </Router>
  </React.StrictMode>
);
