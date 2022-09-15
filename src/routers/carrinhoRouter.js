import { Router } from "express";

import { carregarCarrinho } from "../controllers/carrinhoController.js";
import { validarTokenExistente } from "../middlewares/validarTokenMiddleware.js";

const router = Router();

router.get("/carrinho", validarTokenExistente, carregarCarrinho);

export default router;