import { Router } from "express";

import { carregarCarrinho, finalizarCarrinho, deletarProduto, editarProduto } from "../controllers/carrinhoController.js";
import { validarTokenExistente } from "../middlewares/validarTokenMiddleware.js";
import { verificarSessaoDoUsuario } from "../middlewares/verificarSessaoUserMiddleware.js";
import { verificarSeProdutoEstaNoCarrinho } from "../middlewares/verificarProdutoCarrinhoMiddleware.js";

const router = Router();

//carrinho
router.get("/carrinho", validarTokenExistente,  verificarSessaoDoUsuario ,carregarCarrinho);
router.delete("/carrinho/:id", validarTokenExistente,  verificarSessaoDoUsuario, verificarSeProdutoEstaNoCarrinho ,deletarProduto);
router.put("/carrinho/:id", validarTokenExistente, verificarSessaoDoUsuario,  verificarSeProdutoEstaNoCarrinho ,editarProduto);
//Finalizar Carrinho
router.post("/pedidos", validarTokenExistente, verificarSessaoDoUsuario ,finalizarCarrinho);

export default router;