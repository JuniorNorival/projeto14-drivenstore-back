import { Router } from "express";

import {
  carregarCarrinho,
  finalizarCarrinho,
  deletarProduto,
  editarProduto,
  adcionarNoCarrinho,
  limparCarrinho,
} from "../controllers/carrinhoController.js";
import { validarTokenExistente } from "../middlewares/validarTokenMiddleware.js";
import { verificarSessaoDoUsuario } from "../middlewares/verificarSessaoUserMiddleware.js";
import { verificarSeProdutoEstaNoCarrinho } from "../middlewares/verificarProdutoCarrinhoMiddleware.js";

const router = Router();

//carrinho
router.post(
  "/carrinho/:id",
  validarTokenExistente,
  verificarSessaoDoUsuario,
  adcionarNoCarrinho
);
router.get(
  "/carrinho",
  validarTokenExistente,
  verificarSessaoDoUsuario,
  carregarCarrinho
);
router.delete(
  "/carrinho/:id",
  validarTokenExistente,
  verificarSessaoDoUsuario,
  verificarSeProdutoEstaNoCarrinho,
  deletarProduto
);
router.put(
  "/carrinho/:id",
  validarTokenExistente,
  verificarSessaoDoUsuario,
  verificarSeProdutoEstaNoCarrinho,
  editarProduto
);
router.delete("/carrinho", 
  validarTokenExistente,
  verificarSessaoDoUsuario,
  limparCarrinho
);
//Finalizar Carrinho
router.post(
  "/pedidos",
  validarTokenExistente,
  verificarSessaoDoUsuario,
  finalizarCarrinho
);

export default router;
