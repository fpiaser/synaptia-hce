import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Paciente = () => {
  const { id } = useParams();
  const [historias, setHistorias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/historias/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setHistorias(res.data);
    };
    fetchData();
  }, [id]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Historia Clínica</h1>
      {historias.map(h => (
        <div key={h.id} className="mb-4 p-2 border rounded">
          <p><strong>Fecha:</strong> {new Date(h.fecha).toLocaleDateString()}</p>
          <p><strong>Motivo:</strong> {h.motivo_consulta}</p>
          <p><strong>Diagnóstico:</strong> {h.diagnostico}</p>
          <p><strong>Tratamiento:</strong> {h.tratamiento}</p>
        </div>
      ))}
    </div>
  );
};

export default Paciente;
