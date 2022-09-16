import { ObjectId } from "mongodb";
import { mongo } from "../database/db.js";

let db = await mongo();
async function listarProdutos(req, res) {
  const categoria = req.query.categoria;
  console.log(categoria);
  try {
    const response = await db.collection("produtos").find().toArray();
    if (categoria === "todos" || !categoria) {
      res.send(response).status(200);
      return;
    } else {
      const produtos = response.filter((res) => res.category === categoria);
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

    console.log(produto);
    res.send(produto).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function adcionarProduto(req, res) {
  const { id, titulo, imagem, preco } = req.headers;
  const user = res.locals;
  console.log(user);
  try {
    await db
      .collection("carrinho")
      .insertOne({ id, titulo, imagem, preco, userId: user._id });

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
export { listarProdutos, exibirProduto, adcionarProduto };
