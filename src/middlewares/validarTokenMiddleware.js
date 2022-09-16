function validarTokenExistente(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (token) {
    res.locals.token = token;
    next();
  } else {
    return res.sendStatus(401);
  }
}

export { validarTokenExistente };
