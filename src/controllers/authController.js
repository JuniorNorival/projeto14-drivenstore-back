import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import {mongo} from "../database/db.js";
import {cadastroSchema, loginSchema} from "../schemas/authSchema.js"

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
        res.status(500).send("Erro ao cadastrar o usuário")
    }
    
}

const logarUser = async (req, res) => {
    const {email, senha} = req.body;

    const validation = loginSchema.validate({email, senha}, {abortEarly: false});
    if (validation.error) {
        const erros = validation.error.details.map( detail => detail.message)
        return res.status(422).send(erros);
    }

    try {
        const user = await db.collection("usuarios").findOne({email: email});
        const senhaCorreta = bcrypt.compareSync(senha, user.senha);
        if (user && senhaCorreta) {
            const token = uuid();

            await db.collection("sessoes").insertOne({
                token: token,
                userId: user._id
            });

            res.status(200).send({nome: user.nome, token: token});
        } else {
            return res.status(401).send("Email ou senha incorretos!");
        }


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erro ao realizar o login")
    }
    
} 

export { cadastrarUser, logarUser };