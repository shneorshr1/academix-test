const { TaskGroup } = require('../../models');

module.exports = {
  async getAll(req, res) {
    try {
      const taskGroups = await TaskGroup.findAll();
      res.json(taskGroups);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const taskGroup = await TaskGroup.findByPk(req.params.id);
      if (!taskGroup) return res.status(404).json({ error: 'TaskGroup not found' });
      res.json(taskGroup);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const newTaskGroup = await TaskGroup.create(req.body);
      res.status(201).json(newTaskGroup);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const taskGroup = await TaskGroup.findByPk(req.params.id);
      if (!taskGroup) return res.status(404).json({ error: 'TaskGroup not found' });
      await taskGroup.update(req.body);
      res.json(taskGroup);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      const taskGroup = await TaskGroup.findByPk(req.params.id);
      if (!taskGroup) return res.status(404).json({ error: 'TaskGroup not found' });
      await taskGroup.destroy();
      res.json({ message: 'TaskGroup deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
