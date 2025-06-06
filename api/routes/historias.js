const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const pool = new Pool();

router.get('/:pacienteId', async (req, res) => {
  const { pacienteId } = req.params;
  const result = await pool.query(
    'SELECT * FROM historias_clinicas WHERE paciente_id = $1 ORDER BY fecha DESC',
    [pacienteId]
  );
  res.json(result.rows);
});

router.post('/', async (req, res) => {
  const { paciente_id, profesional_id, motivo_consulta, diagnostico, tratamiento } = req.body;
  await pool.query(
    'INSERT INTO historias_clinicas (paciente_id, profesional_id, motivo_consulta, diagnostico, tratamiento) VALUES ($1, $2, $3, $4, $5)',
    [paciente_id, profesional_id, motivo_consulta, diagnostico, tratamiento]
  );
  res.status(201).send('Historia clínica creada');
});

module.exports = router;
