import { ObjectId } from "mongodb";
import { mongo } from "../database/db.js";

const db = await mongo();

async function mostrarPedido(req, res) {
  const { user, token } = res.locals;
  const sessao = await db.collection("sessoes").findOne({ token });

  try {
    const pedido = await db
      .collection("pedidos")
      .find({ sessaoId: ObjectId(sessao._id) })
      .toArray();
    res.status(200).send(pedido);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Erro ao carregar pedido");
  }
}
async function finalizarPedido(req, res) {
  const pedido = req.body;
  try {
    await db.collection("finalizado").insertOne(pedido);

    res.status(201).send("Pedido Finalizado");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Erro ao finalizar pedido");
  }
}
export { mostrarPedido, finalizarPedido };
