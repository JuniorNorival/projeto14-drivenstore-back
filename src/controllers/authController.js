import bcrypt from "bcrypt";

import {mongo} from "../database/db.js";
import {cadastroSchema} from "../schemas/authSchema.js"

let db = await mongo();

const cadastrarUser = async (req, res) => {
    const {nome, email, senha} = req.body;

    const validation = cadastroSchema.validate({nome, email, senha}, {abortEarly: false})

    if (validation.error) {
        const erros = validation.error.details.map( detail => detail.message);
        return res.status(422).send(erros)
    }

    const senhaCriptografada = bcrypt.hashSync(senha, 10);

    try {
        const user = await db.collection("usuarios").findOne({email: email});

        if (user) {
            return res.status(409).send("Usuário já cadastrado!");
        }

        await db.collection("usuarios").insertOne({
            nome: nome,
            email: email,
            senha: senhaCriptografada           
        });

        res.sendStatus(201);
    } catch (error) {
        console.error(error.message);
        res.sstatus(500).send("Erro ao cadastrar o usuário")
    }
    
}

export { cadastrarUser };