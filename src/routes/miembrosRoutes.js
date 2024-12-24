import express from 'express';
import MiembrosController from '../controllers/miembrosController.js';

const router = express.Router();

router.get('/', MiembrosController.getMiembros);
router.put('/:code', MiembrosController.updateMiembro);
router.delete('/:code', MiembrosController.deleteMiembro);

export default router;