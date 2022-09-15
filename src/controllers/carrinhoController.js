import {mongo} from "../database/db.js";

const db = await mongo();

const carregarCarrinho = async (req, res) => {
    const token = res.locals.token;

    if (!token) {
        return res.status(401).send("Token inválido")
    }

    try {
        const session = await db.collection("sessoes").findOne({token: token});

        if (!session) {
            return res.sendStatus(401);
        }

        const user = await db.collection("usuarios").findOne({_id: session.userId})
        if (!user) {
            return res.sendStatus(401);
        }

        const listaCarrinho = await db.collection("carrinho").find({userId: user._id}).toArray();
        res.status(200).send(listaCarrinho);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erro ao carregar o carrinho")
    }
};

export { carregarCarrinho }