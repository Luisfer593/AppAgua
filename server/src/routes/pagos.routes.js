import { Router } from "express";
import {
  getPagos,
  getPagoById,
  createPago,
  updatePago,
  deletePago,
} from "../controllers/pagos.controller.js";

const router = Router();

// Rutas para pagos (sin el prefijo '/pagos', ya que lo agrega 'app.use('/pagos', pagosRoutes);' en app.js)
router.get("/", getPagos);
router.get("/:id", getPagoById);
router.post("/", createPago);
router.put("/:id", updatePago);
router.delete("/:id", deletePago);

export default router;
