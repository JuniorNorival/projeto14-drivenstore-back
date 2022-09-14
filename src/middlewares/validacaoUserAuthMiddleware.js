import bcrypt from "bcrypt";

import {mongo} from "../database/db.js";

let db = await mongo();

async function validarUserCadastro(req, res, next) {
    const { email } = req.body;
    try {
        const user = await db.collection("usuarios").findOne({email: email});

        if (user) {
            return res.status(409).send("Usuário já cadastrado!");
        }

        next();
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erro ao verificar o usuário durante o cadastro")
    }
}


async function validarUserLogin(req, res, next) {
    const {email, senha} = req.body;

    try {
        const user = await db.collection("usuarios").findOne({email: email});
        const senhaCorreta = bcrypt.compareSync(senha, user.senha);

        if (user && senhaCorreta) {
            res.locals.user = user;

            next();
        } else {
            return res.status(401).send("Email ou senha incorretos!");
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erro ao verificar usuário e senha no banco de dados")
    }
}

export {validarUserCadastro, validarUserLogin}