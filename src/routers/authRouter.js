import { Router } from "express";

import {cadastrarUser, logarUser} from "../controllers/authController.js";

const router = Router();

router.post("/cadastro", cadastrarUser);
router.post("/login", logarUser);

export default router;