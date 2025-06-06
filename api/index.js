const express = require('express');
const cors = require('cors');
const authMiddleware = require('./middleware/auth');
const usuariosRoutes = require('./routes/usuarios');
const pacientesRoutes = require('./routes/pacientes');
const historiasRoutes = require('./routes/historias');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/pacientes', authMiddleware, pacientesRoutes);
app.use('/api/historias', authMiddleware, historiasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
