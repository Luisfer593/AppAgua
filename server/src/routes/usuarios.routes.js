import { Router } from "express";
import {
  getUsuarios,
  getUsuarioId,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  loginUsuario,
  changePasswordUsuario,
} from "../controllers/usuarios.controller.js";

const router = Router();

// Rutas para usuarios
router.get("/", getUsuarios);
router.get("/:id", getUsuarioId);
router.post("/", createUsuario);
router.put("/:id", updateUsuario);
router.delete("/:id", deleteUsuario);

// Autenticación y gestión de contraseñas
router.post("/login", loginUsuario);
router.put("/:id/password", changePasswordUsuario);

export default router;
