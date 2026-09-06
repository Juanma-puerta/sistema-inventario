import { Router } from "express";
import { registrarUsuario } from "../controllers/usuarios.controller.js";
import { loginUsuario } from "../controllers/usuarios.controller.js";

const router = Router();

router.post('/usuarios', registrarUsuario);
router.post('/login', loginUsuario);

export default router;