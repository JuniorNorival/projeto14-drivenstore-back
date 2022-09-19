import { Router } from "express";
import {
  finalizarPedido,
  mostrarPedido,
} from "../controllers/checkoutController.js";
import { validarTokenExistente } from "../middlewares/validarTokenMiddleware.js";
import { verificarSessaoDoUsuario } from "../middlewares/verificarSessaoUserMiddleware.js";
const router = Router();
router.get(
  "/pedido",
  validarTokenExistente,
  verificarSessaoDoUsuario,
  mostrarPedido
);
router.post(
  "/pedido",
  validarTokenExistente,
  verificarSessaoDoUsuario,
  finalizarPedido
);
export default router;
