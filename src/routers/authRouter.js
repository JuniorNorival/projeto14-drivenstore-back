import { Router } from "express";

import {cadastrarUser} from "../controllers/authController.js";

const router = Router();

router.post("/cadastro", cadastrarUser);

export default router;