import { Router } from "express";

import { carregarCarrinho, finalizarCarrinho, deletarProduto, editarProduto } from "../controllers/carrinhoController.js";
import { validarTokenExistente } from "../middlewares/validarTokenMiddleware.js";
import { verificarSessaoDoUsuario } from "../middlewares/verificarSessaoUserMiddleware.js";

const router = Router();

//carrinho
router.get("/carrinho", validarTokenExistente,  verificarSessaoDoUsuario ,carregarCarrinho);
router.delete("/carrinho/:id", validarTokenExistente,  verificarSessaoDoUsuario, deletarProduto);
router.put("/carrinho/:id", validarTokenExistente, verificarSessaoDoUsuario, editarProduto);
//Finalizar Carrinho
router.post("/pedidos", validarTokenExistente, verificarSessaoDoUsuario ,finalizarCarrinho);

export default router;