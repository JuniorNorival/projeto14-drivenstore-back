import { ObjectId } from "mongodb";
import { mongo } from "../database/db.js";

let db = await mongo();
async function listarProdutos(req, res) {
  const categoria = req.query.categoria;
  
  try {
    const response = await db.collection("produtos").find().toArray();

    if (categoria === "todos" || !categoria) {
      res.send(response).status(200);
      return;
    } else {
      const produtos = response.filter((res) => res.categoria === categoria);
      res.send(produtos).status(200);
      return;
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function exibirProduto(req, res) {
  const { id } = req.params;
  const token = res.locals;
  try {
    const produto = await db
      .collection("produtos")
      .findOne({ _id: ObjectId(id) });

    res.send(produto).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export { listarProdutos, exibirProduto };
