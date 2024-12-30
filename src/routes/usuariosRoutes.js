import express from 'express';
import UsuariosController from '../controllers/usuariosController.js';

const router = express.Router();

router.post('/login', UsuariosController.login);

export default router;