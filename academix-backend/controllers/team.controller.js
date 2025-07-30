const { Team } = require('../models');

exports.getAll = async (req, res) => {
  const teams = await Team.findAll();
  res.json(teams);
};

exports.getById = async (req, res) => {
  const team = await Team.findByPk(req.params.id);
  if (!team) return res.status(404).send('Team not found');
  res.json(team);
};

exports.create = async (req, res) => {
  const { course_batch_id, name } = req.body;
  const team = await Team.create({ course_batch_id, name });
  res.status(201).json(team);
};

exports.update = async (req, res) => {
  const { course_batch_id, name } = req.body;
  const [updated] = await Team.update({ course_batch_id, name }, {
    where: { id: req.params.id }
  });
  if (!updated) return res.status(404).send('Team not found');
  res.send('Updated successfully');
};

exports.remove = async (req, res) => {
  const deleted = await Team.destroy({ where: { id: req.params.id } });
  if (!deleted) return res.status(404).send('Team not found');
  res.send('Deleted successfully');
};
