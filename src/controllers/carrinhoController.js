import dayjs from "dayjs";

import {mongo} from "../database/db.js";

const db = await mongo();

const carregarCarrinho = async (req, res) => {
    const user = res.locals.user;

    try {
        const listaCarrinho = await db.collection("carrinho").find({userId: user._id}).toArray();
        res.status(200).send(listaCarrinho);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erro ao carregar o carrinho")
    }
};

const finalizarCarrinho = async (req, res) => {
    const user = res.locals.user;

    try {
        const listaCarrinho = await db.collection("carrinho").find({userId: user._id}).toArray();

        await db.collection("pedidos").insertOne({
            pedidos: listaCarrinho,
            userId: user._id,
            user: user.nome,
            registro: dayjs().format("DD/MM") 
        })
        res.sendStatus(201);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erro ao finalizar o Carrinho")
    }
}

const deletarProduto = async (req, res) => {
    const idProduto = req.params.id;

    try {
        const produto = await db.collection("carrinho").findOne({id: idProduto});

        if (!produto) {
            return res.status(400).send("Produto não está no carrinho!");
        }

        if (produto.quantidade > 0) {
            await db.colletion("carrinho").updateOne({_id: produto._id}, {$set: {
                ...produto,
                quantidade: (produto.quantidade - 1)
            }})

            return res.status(201).send("Quantidade do produto reduzida");
        } 

        await db.collection("carrinho").deleteOne({_id: produto._id});

        res.status(201).send("Produto removido");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erro ao deletar o produto");
    }
    res.sendStatus(201);
}

export { carregarCarrinho, finalizarCarrinho, deletarProduto }