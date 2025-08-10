const express = require("express");
const router = express.Router();
const { getPermissionsForUser } = require("../services/permissions.service");

router.get("/my/:userId", async (req, res) => {
  try {
    const userId = Number(req.params.userId) || 3
    const detailedAssignments = await getPermissionsForUser(userId);
    
    res.json(detailedAssignments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
