import { Router } from "express";

import { carregarCarrinho } from "../controllers/carrinhoController.js";
import { validarTokenExistente } from "../middlewares/validarTokenMiddleware.js";
import { verificarSessaoDoUsuario } from "../middlewares/verificarSessaoUserMiddleware.js";

const router = Router();

router.get("/carrinho", validarTokenExistente,  verificarSessaoDoUsuario ,carregarCarrinho);

export default router;