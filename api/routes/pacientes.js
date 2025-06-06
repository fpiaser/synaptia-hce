const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const pool = new Pool();

router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM pacientes ORDER BY apellido');
  res.json(result.rows);
});

router.post('/', async (req, res) => {
  const { nombre, apellido, dni, fecha_nacimiento, genero } = req.body;
  await pool.query(
    'INSERT INTO pacientes (nombre, apellido, dni, fecha_nacimiento, genero) VALUES ($1, $2, $3, $4, $5)',
    [nombre, apellido, dni, fecha_nacimiento, genero]
  );
  res.status(201).send('Paciente creado');
});

module.exports = router;
