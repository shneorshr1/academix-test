const { Role } = require('../../models');

exports.getAll = async (req, res) => {
  const roles = await Role.findAll();
  res.json(roles);
};
