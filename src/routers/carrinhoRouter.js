import { Router } from "express";

import { carregarCarrinho, finalizarCarrinho } from "../controllers/carrinhoController.js";
import { validarTokenExistente } from "../middlewares/validarTokenMiddleware.js";
import { verificarSessaoDoUsuario } from "../middlewares/verificarSessaoUserMiddleware.js";

const router = Router();

router.get("/carrinho", validarTokenExistente,  verificarSessaoDoUsuario ,carregarCarrinho);

router.post("/pedidos", validarTokenExistente, verificarSessaoDoUsuario ,finalizarCarrinho)

export default router;