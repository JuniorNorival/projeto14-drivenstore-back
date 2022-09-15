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
    const produto = res.locals.produto;
    try {
        if (produto.quantidade > 1) {
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

const editarProduto = async (req, res) => {
    const produto = res.locals.produto;
    try {
        await db.collection("carrinho").updateOne({_id: produto._id}, {$set: {
            ...produto,
            quantidade: produto.quantidade + 1
        }});

        res.status(201).send("Mais um produto incluso")
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erro ao editar o Carrinho")
    }

};

export { carregarCarrinho, finalizarCarrinho, deletarProduto, editarProduto }