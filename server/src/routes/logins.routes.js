import { Router } from "express";
import {
  getLogins,
  getLoginById,
  createLogin,
  updateLogin,
  deleteLogin,
} from "../controllers/logins.controller.js";

const router = Router();

// Rutas para logins
router.get("/", getLogins);
router.get("/:id", getLoginById);
router.post("/", createLogin);
router.put("/:id", updateLogin);
router.delete("/:id", deleteLogin);

export default router;
