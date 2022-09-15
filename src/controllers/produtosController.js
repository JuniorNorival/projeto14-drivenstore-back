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
    const response = await db.collection("produtos").findOne({ id });
    res.send(response).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
export { listarProdutos, exibirProduto };
