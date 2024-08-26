// routes/medidores.routes.js
import express from 'express';
import {
  getMedidores,
  getMedidorById, // Asegúrate de que este nombre coincida
  createMedidor,
  updateMedidor,
  deleteMedidor,
} from '../controllers/medidores.controller.js';

const router = express.Router();

router.get('/', getMedidores);
router.get('/:id', getMedidorById); // Usa el nombre correcto aquí
router.post('/', createMedidor);
router.put('/:id', updateMedidor);
router.delete('/:id', deleteMedidor);

export default router;
