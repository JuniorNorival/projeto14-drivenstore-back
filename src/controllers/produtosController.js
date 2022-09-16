import { ObjectId } from "mongodb";
import { mongo } from "../database/db.js";

let db = await mongo();
async function listarProdutos(req, res) {
  try {
    const response = await db.collection("produtos").find().toArray();
    res.send(response).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function exibirProduto(req, res) {
  const { id } = req.params;
  console.log(id);
  try {
    const response = await db
      .collection("produtos")
      .findOne({ _id: ObjectId(id) });
    console.log(response);
    res.send(response).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function adcionarProduto(req, res) {
  const { id, titulo, imagem, preco } = req.headers;

  try {
    await db
      .collection("carrinho")
      .insertOne({ id, titulo, imagem, preco, userId });

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
export { listarProdutos, exibirProduto, adcionarProduto };
