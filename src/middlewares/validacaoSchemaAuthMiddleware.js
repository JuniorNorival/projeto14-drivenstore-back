import {cadastroSchema, loginSchema} from "../schemas/authSchema.js"

//Cadastro Middlewares
function validarCadastroSchema(req, res, next) {
    const {nome, email, senha} = req.body;

    const validation = cadastroSchema.validate({nome, email, senha}, {abortEarly: false});

    if (validation.error) {
        const erros = validation.error.details.map( detail => detail.message);
        return res.status(422).send(erros)
    }

    next();
}



//Login Middlewares
function validarLoginSchema(req, res, next) {
    const {email, senha} = req.body;

    const validation = loginSchema.validate({email, senha}, {abortEarly: false});
    if (validation.error) {
        const erros = validation.error.details.map( detail => detail.message)
        return res.status(422).send(erros);
    }

    next();
}

export { validarCadastroSchema, validarLoginSchema };