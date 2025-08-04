const { Op } = require("sequelize");
const {
  Task,
  TaskAssignment,
  User,
  Team,
  TaskGroup,
  Axis,
  CourseBatch,
  Course,
  Domain,
  RoleAssignment
} = require("../../models");

async function getCalendarTasks(userId, startDate, endDate) {
  // 1. שליפת ההרשאות של המשתמש
  const roleAssignments = await RoleAssignment.findAll({
    where: { user_id: userId }
  });

  console.log("User scopes:", roleAssignments.map(r => r.scope_type));

  // 2. שליפה בסיסית של כל הטסקים בטווח
  return Task.findAll({
    where: {
        createdAt: {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        }
      },
    include: [
      {
        model: TaskGroup,
        include: [
            {
                model: Axis,
                include: [
                  {
                    model: Course,
                    include: [
                      {
                        model: CourseBatch
                      },
                      {
                        model: Domain
                      }
                    ]
                  }
                ]
              }
              
        ]
      },
    /*   {
        model: TaskAssignment,
        include: [
          { model: User },
          { model: Team }
        ]
      } */
    ],
    order: [["createdAt", "ASC"]]
  });
}

module.exports = { getCalendarTasks };
