function validarTokenExistente(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (token) {
    res.locals.token = token;
    next();
  } else {
    return res.status(401).send("Token Invalido");
  }
}

export { validarTokenExistente };
