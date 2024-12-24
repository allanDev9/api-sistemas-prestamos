import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import miembrosRoutes from './routes/miembrosRoutes.js';

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/miembros', miembrosRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});