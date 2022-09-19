import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import chalk from "chalk";

import authRouter from "./routers/authRouter.js";

import produtosRouter from "./routers/produtosRouter.js";

import carrinhoRouter from "./routers/carrinhoRouter.js";

dotenv.config();

const app = express();

app.use(express.json());

//Cors Configuration - Start
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept Authorization"
  )
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "POST, PUT, PATCH, GET, DELETE"
    )
    return res.status(200).json({})
  }
  next()
})
//Cors Configuration - End


app.get("/", (req, res) => {
  res.send("Tudo certo");
});

//Rota de Auth
app.use(authRouter);


app.use(produtosRouter);
//Rota de Carrinho
app.use(carrinhoRouter);
app.listen(process.env.PORT, () => {
  console.log("=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.");
  console.log(chalk.green("Servidor rodando na porta 5000"));
  console.log("=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.");
});


