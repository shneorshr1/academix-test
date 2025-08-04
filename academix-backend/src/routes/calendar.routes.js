const express = require("express");
const router = express.Router();
const { getCalendarTasksController } = require("../controllers/calendar.controller");
// const { authMiddleware } = require("../middleware/auth"); 

router.get("/", /* authMiddleware, */ getCalendarTasksController);

module.exports = router;
