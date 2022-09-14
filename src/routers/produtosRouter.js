import { Router } from "express";
import { listarProdutos } from "../controllers/produtosController";

const router = Router();
router.get("/produtos", listarProdutos);
