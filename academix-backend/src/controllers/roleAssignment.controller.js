const { RoleAssignment } = require('../../models');


module.exports = {
    async getAll(req, res) {

      try {
        const userId = req.user?.id || 3; 
        
        const roles = await RoleAssignment.findAll({ where: { user_id: userId } });
        res.json(roles);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to load role assignments" });
      }
    },
  
    async getById(req, res) {
      try {
        const item = await RoleAssignment.findByPk(req.params.id);
        if (!item) return res.status(404).json({ error: 'Not found' });
        res.json(item);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    },
  
    async create(req, res) {
      try {
        const newItem = await RoleAssignment.create(req.body);
        res.status(201).json(newItem);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    },
  
    async update(req, res) {
      try {
        const item = await RoleAssignment.findByPk(req.params.id);
        if (!item) return res.status(404).json({ error: 'Not found' });
        await item.update(req.body);
        res.json(item);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    },
  
    async remove(req, res) {
      try {
        const item = await RoleAssignment.findByPk(req.params.id);
        if (!item) return res.status(404).json({ error: 'Not found' });
        await item.destroy();
        res.json({ message: 'Deleted' });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  };
  