// queries/permissionsQueries.js
const {
    Domain,
    Course,
    CourseBatch,
    Team,
    TeamMember,
    User,
    TaskAssignment,
    Task,
  } = require("../../models");
  
  const getSystemData = async () => {
    return await Domain.findAll({
 /*      include: [
        {
          model: Course,
          include: [
            {
              model: CourseBatch,
              attributes: ["id", "name"],
              include: [
                {
                  model: Team,
                  include: [
                    {
                      model: TeamMember,
                      as: "teamMembers",
                      required: false,
                      include: [
                        {
                          model: User,
                          include: [
                            {
                              model: TaskAssignment,
                              include: [
                                {
                                  model: Task,
                                  attributes: ["id", "name", "description"],
                                },
                              ],
                              attributes: ["id", "status", "assigned_at", "completed_at"],
                            },
                          ],
                          attributes: ["id", "name", "email"],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ], */
    });
  };
  
  const getDomainData = async (id) => {
    return await Domain.findByPk(id, {
      include: [
        {
          model: Course,
          attributes: ["id", "name"],
          include: [
            {
              model: CourseBatch,
              attributes: ["id", "name"],
              include: [
                {
                  model: Team,
                  include: [
                    { model: TeamMember, as: "teamMembers", required: false },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
  };
  
  const getCourseData = async (id) => {
    return await Course.findByPk(id, {
      include: [
        {
          model: Domain,
          attributes: ["id", "name"],
        },
        {
          model: CourseBatch,
          attributes: ["id", "name"],
          include: [
            {
              model: Team,
              include: [
                {
                  model: TeamMember,
                  as: "teamMembers",
                  required: false,
                  include: [
                    {
                      model: User,
                      include: [
                        {
                          model: TaskAssignment,
                          include: [
                            {
                              model: Task,
                              attributes: ["id", "name", "description"],
                            },
                          ],
                          attributes: ["id", "status", "assigned_at", "completed_at"],
                        },
                      ],
                      attributes: ["id", "name", "email"],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
  };
  
  const getTeamData = async (id) => {
    return await Team.findByPk(id, {
      include: [
        {
          model: CourseBatch,
          attributes: ["id", "name"],
          include: [
            {
              model: Course,
              attributes: ["id", "name"],
              include: [
                {
                  model: Domain,
                  attributes: ["id", "name"],
                },
              ],
            },
          ],
        },
        {
          model: TeamMember,
          as: "teamMembers",
          required: false,
        },
      ],
    });
  };
  
  module.exports = {
    getSystemData,
    getDomainData,
    getCourseData,
    getTeamData,
  };
  