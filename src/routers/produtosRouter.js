import { Router } from "express";
import {
  adcionarProduto,
  exibirProduto,
  listarProdutos,
} from "../controllers/produtosController.js";
import { validarTokenExistente } from "../middlewares/validarTokenMiddleware.js";

const router = Router();
router.get("/produtos", listarProdutos);
router.get("/produtos/:id", exibirProduto);
router.post("/carrinho/:id", validarTokenExistente, adcionarProduto);

export default router;
