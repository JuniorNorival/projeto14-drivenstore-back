import { Router } from "express";
import {
  adcionarProduto,
  exibirProduto,
  listarProdutos,
} from "../controllers/produtosController.js";

const router = Router();
router.get("/produtos", listarProdutos);
router.get("/produtos/:id", exibirProduto);
router.post("/carrinho/:id", adcionarProduto);

export default router;
