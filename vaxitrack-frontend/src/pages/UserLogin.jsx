import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Logo from '../assets/vaxitrack-logo.png'; // Adjust path as needed
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const UserLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:7000/vaxitrack/auth/user-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, password }),
      });

      const data = await res.json();

      if (res.ok) {
        const userId = data.user._id;
        navigate(`/user-dashboard/${userId}`);
      } else {
        setError(data.message || 'Login failed.');
      }
    } catch (err) {
      setError('Server error. Try again later.');
    }
  };


  return (
    <div className="flex flex-col min-h-screen w-screen bg-blue-200">
      <Header />

      <main className="flex flex-grow">
        {/* Left side: Logo */}
        <div className="w-1/2 bg-[#E6F7F9] flex justify-center items-center p-8">
          <img src={Logo} alt="VaxiTrack Logo" className="max-w-xs w-full h-auto" />
        </div>

        {/* Right side: Login form */}
        <div className="w-1/2 flex justify-center items-center p-8 bg-white">
          <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-[#007C91]">User Login</h2>

            {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

            <label className="block mb-2 text-sm font-semibold">Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded"
              placeholder="e.g. 09012345678"
              required
            />

            <label className="block mb-2 text-sm font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded"
              placeholder="Enter your password"
              required
            />

            <button
              type="submit"
              className="w-full bg-[#007C91] text-white py-2 rounded hover:bg-[#014B53] transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};


export default UserLogin;
