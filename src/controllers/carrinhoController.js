import {mongo} from "../database/db.js";

let db = mongo();

const carregarCarrinho = async (req, res) => {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const session = await db.collection("sessoes").findOne({token});
        if (!session) {
            return res.sendStatus(401);
        }

        const user = await db.collection("usuarios").fincdOne({_id: session.userId})
        if (!user) {
            return res.sendStatus(401);
        }

        const listaCarrinho = await db.collection("carrinho").find({userId: user._id}).toArray();
        res.send(listaCarrinho);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erro ao carregar o carrinho")
    }
    res.send("Ok")
};

export { carregarCarrinho }