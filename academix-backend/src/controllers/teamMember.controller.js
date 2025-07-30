const { TeamMember } = require('../../models');

exports.getAll = async (req, res) => {
  const data = await TeamMember.findAll();
  res.json(data);
};

exports.getById = async (req, res) => {
  const data = await TeamMember.findByPk(req.params.id);
  data ? res.json(data) : res.status(404).json({ error: 'Not found' });
};

exports.create = async (req, res) => {
  const data = await TeamMember.create(req.body);
  res.status(201).json(data);
};

exports.update = async (req, res) => {
  const [updated] = await TeamMember.update(req.body, { where: { id: req.params.id } });
  updated ? res.json({ success: true }) : res.status(404).json({ error: 'Not found' });
};

exports.remove = async (req, res) => {
  const deleted = await TeamMember.destroy({ where: { id: req.params.id } });
  deleted ? res.json({ success: true }) : res.status(404).json({ error: 'Not found' });
};
