const express = require("express");
const router = express.Router();
const {
  RoleAssignment,
  Role,
  Domain,
  CourseBatch,
  Team,
  Course,
  User,
  TeamMember,
} = require("../../models");

const scopeIncludes = {
  domain: [
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
  batch: [
    {
      model: Course,
      attributes: ["id", "name"],
      include: [{ model: Domain, attributes: ["id", "name"] }],
    },
    {
      model: Team,
      include: [{ model: TeamMember, as: "teamMembers", required: false }],
    },
  ],
  team: [
    {
      model: CourseBatch,
      attributes: ["id", "name"],
      include: [
        {
          model: Course,
          attributes: ["id", "name"],
          include: [{ model: Domain, attributes: ["id", "name"] }],
        },
      ],
    },
    { model: TeamMember, as: "teamMembers", required: false },
  ],
};

router.get("/my", async (req, res) => {
  try {
    const userId = req.user?.id || 5;

    const assignments = await RoleAssignment.findAll({
      where: { user_id: userId },
      raw: true,
    });

    const detailedAssignments = await Promise.all(
      assignments.map(async (assignment) => {
        const modelMap = {
          domain: Domain,
          batch: CourseBatch,
          team: Team,
        };

        const model = modelMap[assignment.scope_type];
        if (!model) return assignment;

        const details = await model.findByPk(assignment.scope_id, {
          include: scopeIncludes[assignment.scope_type],
        });

        return { ...assignment, [assignment.scope_type]: details };
      })
    );

    res.json(detailedAssignments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
