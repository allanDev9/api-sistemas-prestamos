import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import miembrosRoutes from './routes/miembrosRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/miembros', miembrosRoutes);
app.use('/api/usuarios', usuariosRoutes);

app.post('/api/login', (req, res) => {
    res.send("Login endpoint reached");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});