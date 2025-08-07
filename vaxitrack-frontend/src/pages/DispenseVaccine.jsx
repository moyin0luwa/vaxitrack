import React, { useState } from 'react';
import axios from 'axios';
import Logo from '../assets/vaxitrack-logo.png';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DispenseVaccine = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    vaccineName: '',
    doseAdministered: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:7000/vaxitrack/dispense-vaccine', formData);
      alert('Vaccine dispensed successfully!');
    } catch (error) {
      console.error(error);
      alert('Error dispensing vaccine');
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

        {/* Right side: Form */}
        <div className="w-1/2 flex justify-center items-center p-8 bg-white">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
          >
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-sm font-medium text-[#007C91]">
                Patient Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md bg-white text-black"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="vaccineName" className="block text-sm font-medium text-[#007C91]">
                Vaccine Name
              </label>
              <input
                type="text"
                id="vaccineName"
                name="vaccineName"
                value={formData.vaccineName}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md bg-white text-black"
              />
            </div>


            <button
              type="submit"
              className="w-full bg-[#007C91] hover:bg-[#005F6B] text-white font-semibold py-2 px-4 rounded-md transition duration-300"
            >
              Dispense
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DispenseVaccine;
