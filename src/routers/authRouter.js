import { Router } from "express";

import {cadastrarUser, logarUser} from "../controllers/authController.js";
import { validarCadastroSchema, validarLoginSchema } from "../middlewares/validacaoSchemaAuthMiddleware.js";
import { validarUserCadastro, validarUserLogin } from "../middlewares/validacaoUserAuthMiddleware.js";
const router = Router();

router.post("/cadastro", validarCadastroSchema, validarUserCadastro ,cadastrarUser);
router.post("/login",validarLoginSchema, validarUserLogin ,logarUser);

export default router;