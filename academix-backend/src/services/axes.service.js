const { Axis, Team,Course } = require('../../models');
const { Op } = require('sequelize');

async function getAxesForPermission(permission) {

  const courseId = permission.scope_type === 'course'
    ? permission.scope_id
    : permission.scope_type === 'domain'
      ? await getCourseIdFromDomain(permission.scope_id)
      : null;

  const teamId = permission.scope_type === 'team' ? permission.scope_id : null;

  const where = {
    ...(courseId && {
      courseId,
      teamId: null,
    }),
    ...(teamId && {
      [Op.or]: [
        { teamId: teamId },
        { teamId: null }, 
      ]
    }),
  };

  const axes = await Axis.findAll({ where });
  return axes;
}

async function getCourseIdFromDomain(domainId) {
  const course = await Course.findOne({ where: { domain_id: domainId } });
  return course?.id || null;
}


module.exports = { getAxesForPermission };