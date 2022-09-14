import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import chalk from 'chalk';

import authRouter from "./routers/authRouter.js";

dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Tudo certo")
})

//Rota de Auth
app.use(authRouter);

app.listen(5000, () => {
    console.log("=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.");
    console.log(chalk.green("Servidor rodando na porta 5000"));
    console.log("=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.");
})