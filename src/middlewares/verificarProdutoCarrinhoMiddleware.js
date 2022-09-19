import { mongo } from "../database/db.js";

const db = await mongo();

async function verificarSeProdutoEstaNoCarrinho(req, res, next) {
    const idProduto = req.params.id;

    try {
        const produto = await db.collection("carrinho").findOne({idProduto: idProduto});

        if (!produto) {
            return res.status(400).send("Produto não está no carrinho!");
        }

        res.locals.produto = produto;
        next();
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erro ao verificar se o produto está no carrinho");
    }
}

export { verificarSeProdutoEstaNoCarrinho };