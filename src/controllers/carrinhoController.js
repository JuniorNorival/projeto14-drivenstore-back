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

export { carregarCarrinho, finalizarCarrinho }