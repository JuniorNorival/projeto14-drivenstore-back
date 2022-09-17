import { Router } from "express";
import {
  exibirProduto,
  listarProdutos,
} from "../controllers/produtosController.js";

const router = Router();
router.get("/produtos", listarProdutos);
router.get("/produtos/:id", exibirProduto);

export default router;
