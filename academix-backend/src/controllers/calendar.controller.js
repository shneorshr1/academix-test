const { getCalendarTasks } = require("../services/calendar.service");

async function getCalendarTasksController(req, res) {
    try {
    
      const userId = req.user?.id || 3; 
      
      const { start, end } = req.query;
  
      if (!start || !end) {
        return res.status(400).json({ error: "Missing start or end date" });
      }
  
      
      const tasks = await getCalendarTasks(userId, start, end);

      console.log(tasks);
      res.json(tasks);
    } catch (err) {
      console.error("Error fetching calendar tasks:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
module.exports = { getCalendarTasksController };
