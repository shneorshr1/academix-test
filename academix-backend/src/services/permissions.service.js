const { RoleAssignment } = require("../../models");
const { getSystemData, getDomainData, getCourseData, getTeamData } = require("../queries/permissionsQueries");

const getPermissionsForUser = async (userId) => {
  const assignments = await RoleAssignment.findAll({ where: { user_id: userId }, raw: true });

  
  return await Promise.all(assignments.map(async (assignment) => {
    switch (assignment.scope_type) {
      case "system":
        return { ...assignment, system: await getSystemData() };
      case "domain":
        return { ...assignment, domain: await getDomainData(assignment.scope_id) };
      case "course":
        return { ...assignment, course: await getCourseData(assignment.scope_id) };
      case "team":
        return { ...assignment, team: await getTeamData(assignment.scope_id) };
      default:
        return assignment;
    }
  }));
};

module.exports = { getPermissionsForUser };
