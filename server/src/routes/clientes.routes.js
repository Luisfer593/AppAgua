import { Router } from "express";
import {
  getClientes,
  getClienteId,
  createCliente,
  updateCliente,
  deleteCliente,
} from "../controllers/clientes.controller.js";

const router = Router();

// Rutas para la gestión de clientes
router.get("/", getClientes);           // Obtener todos los clientes
router.get("/:id", getClienteId);        // Obtener un cliente por ID
router.post("/", createCliente);         // Crear un nuevo cliente
router.put("/:id", updateCliente);       // Actualizar un cliente por ID
router.delete("/:id", deleteCliente);    // Eliminar un cliente por ID

export default router;
