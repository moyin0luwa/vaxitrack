import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = ({ userId }) => {
  const [profile, setProfile] = useState(null);
  const [vaccinationRecords, setVaccinationRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/vaxitrack/user/dashboard/${userId}`);
        setProfile(response.data.profile);
        setVaccinationRecords(response.data.vaccinationRecords);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userId]);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-NG', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>User Dashboard</h2>

      {profile && (
        <div style={{ marginBottom: '2rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '10px' }}>
          <h3>👤 Profile</h3>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Phone:</strong> {profile.phoneNumber}</p>
        </div>
      )}

      <div>
        <h3>💉 Vaccination Records</h3>
        {vaccinationRecords.length === 0 ? (
          <p>No vaccination records found.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Vaccine Name</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Next Dose Due</th>
              </tr>
            </thead>
            <tbody>
              {vaccinationRecords.map((record, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{record.vaccineName}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    {record.nextDoseDue ? formatDate(record.nextDoseDue) : 'Completed'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
