const { Axis,Team,CourseBatch } = require('../../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.getAll = async (req, res) => {
  try {
    const axes = await Axis.findAll();
    res.json(axes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch axes' });
  }
};

exports.getById = async (req, res) => {
  try {
    const axis = await Axis.findByPk(req.params.id);
    if (!axis) return res.status(404).json({ error: 'Axis not found' });
    res.json(axis);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch axis' });
  }
};

exports.create = async (req, res) => {
  try {
    const axis = await Axis.create(req.body);
    res.status(201).json(axis);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create axis' });
  }
};

exports.update = async (req, res) => {
  try {
    const axis = await Axis.findByPk(req.params.id);
    if (!axis) return res.status(404).json({ error: 'Axis not found' });
    await axis.update(req.body);
    res.json(axis);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update axis' });
  }
};

exports.remove = async (req, res) => {
  try {
    const axis = await Axis.findByPk(req.params.id);
    if (!axis) return res.status(404).json({ error: 'Axis not found' });
    await axis.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete axis' });
  }
};

exports.getAxesByPermission = async (req, res) => {
  try {
    const { scopeType, scopeId } = req.query;

    let where = {};

    if (scopeType === 'course') {
      where = {
        courseId: parseInt(scopeId),
        team_id: null, // גלובלי לקורס
      };
    } else if (scopeType === 'domain') {
      const courses = await Course.findAll({ where: { domain_id: parseInt(scopeId) } });
      const courseIds = courses.map(course => course.id);

      where = {
        courseId: { [Op.in]: courseIds },
        teamId: null,
      };
    } else  if (scopeType === 'team') {
      const team = await Team.findByPk(scopeId, {
        include: [
          {
            model: CourseBatch,
            attributes: ['id'],
          },
        ],
      });
    
      if (!team || !team.CourseBatch) {
        return res.status(404).json({ error: 'Team or CourseBatch not found' });
      }
    
      const courseBatchId = team.CourseBatch.id;
    
      where = {
        courseId: courseBatchId,
        [Op.or]: [
          { team_id: null },
          { team_id: parseInt(scopeId) },
        ],
      };
    }else {
      return res.status(400).json({ error: 'Invalid scope type' });
    }

    const axes = await Axis.findAll({ where });
    // console.log(axes);
    res.json(axes);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
