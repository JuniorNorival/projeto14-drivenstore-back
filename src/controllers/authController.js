import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import {mongo} from "../database/db.js";

let db = await mongo();

const cadastrarUser = async (req, res) => {
    const {nome, email, senha} = req.body;

    const senhaCriptografada = bcrypt.hashSync(senha, 10);

    try {

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
    const token = uuid();
    const { user } = res.locals

    try {

        await db.collection("sessoes").insertOne({
            token: token,
            userId: user._id
        });

        res.status(200).send({nome: user.nome, token: token});


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erro ao realizar o login")
    }
    
} 

export { cadastrarUser, logarUser };