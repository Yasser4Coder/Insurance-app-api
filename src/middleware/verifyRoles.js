const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);

    const rolesArray = [...allowedRoles];
    const hasRole = req.roles.some((role) => rolesArray.includes(role));

    if (!hasRole) return res.sendStatus(401);
    next();
  };
};

export default verifyRoles;
