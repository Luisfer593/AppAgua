import { Router } from "express";
import {
  getConsumos,
  getConsumoId,
  createConsumo,
  updateConsumo,
  deleteConsumo,
} from "../controllers/consumos.controller.js";

const router = Router();

// Rutas para consumos
router.get("/", getConsumos);
router.get("/:id", getConsumoId);
router.post("/", createConsumo);
router.put("/:id", updateConsumo);
router.delete("/:id", deleteConsumo);

export default router;
