import { mongo } from "../database/db.js";

const db = await mongo();

async function verificarSessaoDoUsuario(req, res, next) {
  const token = res.locals.token;

  try {
    const session = await db.collection("sessoes").findOne({ token: token });

    if (!session) {
      return res.status(401).send("Sessão Invalida");
    }

    const user = await db
      .collection("usuarios")
      .findOne({ _id: session.userId });
    if (!user) {
      return res.status(401).send("Usuario Invalido");
    }
    delete user.senha;
    res.locals.user = user;
    //res.locals.session = session;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Erro ao validar a existência de um usuário");
  }
}

export { verificarSessaoDoUsuario };
