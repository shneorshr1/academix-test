const { TaskAssignment } = require('../models');

exports.getAllTaskAssignments = async (req, res) => {
  try {
    const assignments = await TaskAssignment.findAll();
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTaskAssignmentById = async (req, res) => {
  try {
    const assignment = await TaskAssignment.findByPk(req.params.id);
    if (!assignment) return res.status(404).json({ error: 'TaskAssignment not found' });
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTaskAssignment = async (req, res) => {
  try {
    const assignment = await TaskAssignment.create(req.body);
    res.status(201).json(assignment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateTaskAssignment = async (req, res) => {
  try {
    const [updated] = await TaskAssignment.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) return res.status(404).json({ error: 'TaskAssignment not found' });
    const updatedAssignment = await TaskAssignment.findByPk(req.params.id);
    res.json(updatedAssignment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTaskAssignment = async (req, res) => {
  try {
    const deleted = await TaskAssignment.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) return res.status(404).json({ error: 'TaskAssignment not found' });
    res.json({ message: 'TaskAssignment deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
