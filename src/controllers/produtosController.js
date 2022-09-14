import db from "../database/db.js";

async function listarProdutos(req, res) {
  try {
    const response = await db.collection("produtos").find().toArray();
    res.send(response).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
export { listarProdutos };
