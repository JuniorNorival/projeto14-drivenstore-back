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
    const session = res.locals.session;

    res.sendStatus(200);
}

export { carregarCarrinho, finalizarCarrinho }