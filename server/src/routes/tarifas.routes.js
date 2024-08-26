import { Router } from "express";
import {
  getTarifas,
  getTarifaById,
  createTarifa,
  updateTarifa,
  deleteTarifa,
} from "../controllers/tarifas.controller.js";

const router = Router();

// Rutas para tarifas
router.get("/", getTarifas);
router.get("/:id", getTarifaById);
router.post("/", createTarifa);
router.put("/:id", updateTarifa);
router.delete("/:id", deleteTarifa);

export default router;
