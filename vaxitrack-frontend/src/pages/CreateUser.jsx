// src/pages/CreateUser.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import logo from '../assets/vaxitrack-logo.png';

const CreateUser = () => {
  const [formData, setFormData] = useState({
  fullName: '',
  age: '',
  dob: '',
  phone: '',
  email: '',
  location: '',
  gender: '',
  occupation: '',
  maritalStatus: '',
  isElderly: 'false',
  caregiverType: '',
  language: 'English', // Will be mapped to preferredLanguage
  children: '',
});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  // Transform the formData to match schema
  const payload = {
    fullName: formData.fullName,
    age: Number(formData.age),
    dateOfBirth: new Date(formData.dob),
    phone: formData.phone,
    email: formData.email,
    location: formData.location,
    gender: formData.gender,
    occupation: formData.occupation,
    maritalStatus: formData.maritalStatus,
    isElderly: formData.isElderly === 'true', // convert string to boolean
    caregiverType: formData.caregiverType,
    preferredLanguage: formData.language,
    children: parseChildren(formData.children),
  };

  try {
    const res = await axios.post(
      'http://localhost:7000/vaxitrack/admin/create-user',
      payload
    );
    alert('User created successfully!');
    console.log(res.data);
  } catch (error) {
    console.error(error);
    alert('Error creating user');
  }
};

// Parse children input (from textarea) into array of objects
const parseChildren = (text) => {
  // Expected format: John-5, Lily-3
  if (!text.trim()) return [];

  return text.split(',').map((entry) => {
    const [name, age] = entry.split('-').map((v) => v.trim());
    return { name, age: Number(age) };
  });
};


  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex flex-grow">
        {/* Left side: Logo */}
        <div className="w-1/3 bg-[#E6F7F9] flex justify-center items-center p-8">
          <img src={logo} alt="VaxiTrack Logo" className="max-w-xs w-full h-auto" />
        </div>

        {/* Right side: Form */}
        <div className="w-2/3 bg-white flex justify-center items-center p-8">
          <div className="w-full max-w-6xl bg-white shadow-xl rounded-2xl p-10">
            <h2 className="text-3xl font-bold mb-8 text-center text-[#007C91]">
              Create User
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="col-span-2 border border-gray-300 rounded-lg p-2" />
              <input name="age" type="number" placeholder="Age" value={formData.age} onChange={handleChange} className="border border-gray-300 rounded-lg p-2" />
              <input name="dob" type="date" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} className="border border-gray-300 rounded-lg p-2" />
              <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="border border-gray-300 rounded-lg p-2" />
              <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="col-span-2 border border-gray-300 rounded-lg p-2" />
              <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="border border-gray-300 rounded-lg p-2" />

              <select name="gender" value={formData.gender} onChange={handleChange} className="border border-gray-300 rounded-lg p-2">
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>

              <input name="occupation" placeholder="Occupation" value={formData.occupation} onChange={handleChange} className="border border-gray-300 rounded-lg p-2" />

              <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className="border border-gray-300 rounded-lg p-2">
                <option value="">Marital Status</option>
                <option>Single</option>
                <option>Married</option>
                <option>Divorced</option>
                <option>Widowed</option>
              </select>

              <select name="isElderly" value={formData.isElderly} onChange={handleChange} className="border border-gray-300 rounded-lg p-2">
                <option value="false">Elderly?</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>

              <select name="caregiverType" value={formData.caregiverType} onChange={handleChange} className="border border-gray-300 rounded-lg p-2">
                <option value="">Caregiver Type</option>
                <option>Mother</option>
                <option>Father</option>
                <option>Guardian</option>
                <option>Self</option>
              </select>

              <input name="language" placeholder="Preferred Language" value={formData.language} onChange={handleChange} className="border border-gray-300 rounded-lg p-2" />

              <textarea name="children" placeholder="Children (Name & Age)" value={formData.children} onChange={handleChange} className="col-span-4 border border-gray-300 rounded-lg p-2" />

              <button type="submit" className="col-span-4 bg-[#007C91] hover:bg-[#014B53] text-white font-semibold py-2 px-8 rounded-lg transition">
                Create User
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateUser;
