import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/api/pacientes', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setPacientes(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pacientes</h1>
      <ul>
        {pacientes.map(p => (
          <li key={p.id}>
            <a href={`/paciente/${p.id}`} className="text-blue-500 hover:underline">
              {p.apellido}, {p.nombre}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
