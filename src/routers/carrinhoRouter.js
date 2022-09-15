import { Router } from "express";

import { carregarCarrinho } from "../controllers/carrinhoController.js";

const router = Router();

router.get("/carrinho", carregarCarrinho);

export default router;