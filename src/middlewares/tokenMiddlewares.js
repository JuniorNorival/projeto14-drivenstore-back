async function tokenValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.status(401).send({ message: "Envie um token valido" });
  const session = await db.collection("sessoes").findOne({ token });

  if (!session) return res.status(401).send({ message: "Sessão invalida" });

  next();
}

export { tokenValidation };
