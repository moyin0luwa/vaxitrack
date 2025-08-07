import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import logo from '../assets/vaxitrack-logo.png';

const CreateVaccine = () => {
  const [formData, setFormData] = useState({
    vaccineName: '',
    disease: '',
    manufacturer: '',
    numberOfDoses: '',
    dosingInterval: '',
    ageGroup: '',
    routeOfAdministration: '',
    stockCount: '',
    storageRequirements: '',
    expiryDate: '',
    location: '',
    description: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/vaccines', formData);
      setSuccessMessage('Vaccine added successfully!');
      setErrorMessage('');
      setFormData({
        vaccineName: '',
        disease: '',
        manufacturer: '',
        numberOfDoses: '',
        dosingInterval: '',
        ageGroup: '',
        routeOfAdministration: '',
        stockCount: '',
        storageRequirements: '',
        expiryDate: '',
        location: '',
        description: '',
      });
    } catch (error) {
      console.error(error);
      setErrorMessage('Error adding vaccine. Please check the form.');
      setSuccessMessage('');
    }
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
            Add New Vaccine
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[ 
              ['vaccineName', 'Vaccine Name'],
              ['disease', 'Disease'],
              ['manufacturer', 'Manufacturer'],
              ['numberOfDoses', 'Number of Doses', 'number'],
              ['dosingInterval', 'Dosing Interval (days)', 'number'],
              ['ageGroup', 'Age Group'],
              ['stockCount', 'Stock Count', 'number'],
              ['storageRequirements', 'Storage Requirements'],
              ['expiryDate', 'Expiry Date', 'date'],
              ['location', 'Location'],
              ['description', 'Description'],
            ].map(([name, label, type = 'text']) => (
              <div key={name} className="col-span-1">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
                  {label}
                </label>
                <input
                  type={type}
                  id={name}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required={name !== 'dosingInterval' && name !== 'description' && name !== 'storageRequirements'}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            ))}

            {/* Route of Administration Dropdown */}
            <div className="col-span-1">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="routeOfAdministration">
                Route of Administration
              </label>
              <select
                id="routeOfAdministration"
                name="routeOfAdministration"
                value={formData.routeOfAdministration}
                onChange={handleChange}
                required
                className="shadow border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select a route</option>
                <option value="oral">Oral</option>
                <option value="intramuscular">Intramuscular</option>
                <option value="subcutaneous">Subcutaneous</option>
                <option value="intradermal">Intradermal</option>
                <option value="nasal">Nasal</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="col-span-3 mt-6 flex justify-center">
              <button
                type="submit"
                className="bg-[#007C91] hover:bg-[#014B53] text-white font-semibold py-2 px-8 rounded-lg transition"
              >
                Add Vaccine
              </button>
            </div>

            {/* Feedback Messages */}
            {successMessage && <p className="col-span-3 text-green-600 mt-2 text-center">{successMessage}</p>}
            {errorMessage && <p className="col-span-3 text-red-600 mt-2 text-center">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </main>

    <Footer />
  </div>
);
}

export default CreateVaccine;
