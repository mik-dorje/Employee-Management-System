// if !result, verifyRoles() is terminated and .post() is stopped without executing employeesController.createNewEmployee
//  if result is true, next() in verifyRoles is executed and employeesController.createNewEmployee is executed

const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.foundUser?.roles) return res.sendStatus(401);
    const rolesArray = [...allowedRoles];

    const result = req?.foundUser?.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);
    if (!result) return res.sendStatus(401);
    next();
  };
};

module.exports = verifyRoles;
