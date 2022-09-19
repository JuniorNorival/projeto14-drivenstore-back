import dayjs from "dayjs";
import { ObjectId } from "mongodb";

import { mongo } from "../database/db.js";

const db = await mongo();

async function adcionarNoCarrinho(req, res) {
  const { titulo, imagem, preco, quantidade } = req.body;
  const { id } = req.params;
  const { user } = res.locals;

  console.log(req.body);
  try {
    await db.collection("carrinho").insertOne({
      idProduto: id,
      titulo,
      imagem,
      preco: quantidade * preco,
      quantidade,
      userId: user._id,
    });

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

const carregarCarrinho = async (req, res) => {
  const user = res.locals.user;

  try {
    const listaCarrinho = await db
      .collection("carrinho")
      .find({ userId: user._id })
      .toArray();
    res.status(200).send(listaCarrinho);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Erro ao carregar o carrinho");
  }
};

const finalizarCarrinho = async (req, res) => {
  const user = res.locals.user;

  try {
    const listaCarrinho = await db
      .collection("carrinho")
      .find({ userId: user._id })
      .toArray();

    let soma = 0;
    listaCarrinho.map( (value)=> {
      if (typeof value.preco === "number") {
        soma += value.preco;
      }
    })

    await db.collection("pedidos").insertOne({
      pedidos: listaCarrinho,
      userId: user._id,
      user: user.nome,
      total: soma,
      registro: dayjs().format("DD/MM"),
    });
    res.sendStatus(201);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Erro ao finalizar o Carrinho");
  }
};

const deletarProduto = async (req, res) => {
  const produto = res.locals.produto;
  try {
    if (produto.quantidade <= 1) {
      await db.collection("carrinho").deleteOne({ _id: ObjectId(produto._id) });

      res.status(201).send("Produto removido");
    }
    
    console.log("Qtd: " + produto.quantidade + " Tipo: " + typeof produto.quantidade);
    if (produto.quantidade !== "1" || produto.quantidade > 1) {
      await db.collection("carrinho").updateOne(
        { _id: produto._id },
        {
          $set: {
            quantidade: Number(produto.quantidade) - 1,
          },
        }
      );

      return res.status(201).send("Quantidade do produto reduzida");
    } 
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Erro ao deletar o produto");
  }


}

const editarProduto = async (req, res) => {
  const produto = res.locals.produto;
  try {
    await db.collection("carrinho").updateOne(
      { _id: ObjectId(produto._id) },
      {
        $set: {
          ...produto,
          quantidade: Number(produto.quantidade) + 1,
        },
      }
    );

    res.status(201).send("Mais um produto incluso");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Erro ao editar o Carrinho");
  }
};

const limparCarrinho = async (req, res) => {
  const user = res.locals.user;

  try {
    await db.collection("carrinho").deleteMany({userId: user._id });

    res.sendStatus(200);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Erro ao limpar o carrinho");
  }
}

export {
  adcionarNoCarrinho,
  carregarCarrinho,
  finalizarCarrinho,
  deletarProduto,
  editarProduto,
  limparCarrinho,
};
