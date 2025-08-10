const express = require("express");
const router = express.Router();
const { getCalendarTasksController } = require("../controllers/calendar.controller");

router.get("/", getCalendarTasksController);

module.exports = router;
