const { Axis } = require('../../models');

module.exports = {
  async getAll(req, res) {
    try {
      const axes = await Axis.findAll();
      res.json(axes);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch axes' });
    }
  },

  async getById(req, res) {
    try {
      const axis = await Axis.findByPk(req.params.id);
      if (!axis) return res.status(404).json({ error: 'Axis not found' });
      res.json(axis);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch axis' });
    }
  },

  async create(req, res) {
    try {
      const axis = await Axis.create(req.body);
      res.status(201).json(axis);
    } catch (err) {
      res.status(400).json({ error: 'Failed to create axis' });
    }
  },

  async update(req, res) {
    try {
      const axis = await Axis.findByPk(req.params.id);
      if (!axis) return res.status(404).json({ error: 'Axis not found' });
      await axis.update(req.body);
      res.json(axis);
    } catch (err) {
      res.status(400).json({ error: 'Failed to update axis' });
    }
  },

  async remove(req, res) {
    try {
      const axis = await Axis.findByPk(req.params.id);
      if (!axis) return res.status(404).json({ error: 'Axis not found' });
      await axis.destroy();
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete axis' });
    }
  },
};
