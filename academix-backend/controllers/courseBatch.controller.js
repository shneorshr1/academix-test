const { CourseBatch } = require('../models');

module.exports = {
  getAll: async (req, res) => {
    const batches = await CourseBatch.findAll();
    res.json(batches);
  },

  getById: async (req, res) => {
    const batch = await CourseBatch.findByPk(req.params.id);
    if (batch) res.json(batch);
    else res.status(404).json({ error: 'CourseBatch not found' });
  },

  create: async (req, res) => {
    const { courseId, name, start_date, end_date } = req.body;
    try {
      const batch = await CourseBatch.create({ courseId, name, start_date, end_date });
      res.status(201).json(batch);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  update: async (req, res) => {
    const { courseId, name, start_date, end_date } = req.body;
    const batch = await CourseBatch.findByPk(req.params.id);
    if (!batch) return res.status(404).json({ error: 'CourseBatch not found' });

    await batch.update({ courseId, name, start_date, end_date });
    res.json(batch);
  },

  remove: async (req, res) => {
    const batch = await CourseBatch.findByPk(req.params.id);
    if (!batch) return res.status(404).json({ error: 'CourseBatch not found' });

    await batch.destroy();
    res.json({ message: 'Deleted successfully' });
  }
};
