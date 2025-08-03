const express = require('express');
const app = express();
const userRoutes = require('./src/routes/user.routes');
const domainRoutes = require('./src/routes/domain.routes');
const courseRoutes = require('./src/routes/course.routes');
const courseBatchRoutes = require('./src/routes/courseBatch.routes');
const axisRoutes = require('./src/routes/axis.routes'); 
const taskGroupRoutes = require('./src/routes/taskGroup.routes');
const taskRoutes = require('./src/routes/task.routes');
const taskAssignmentRoutes = require('./src/routes/taskAssignment.routes');
const roleAssignmentRoutes = require('./src/routes/roleAssignment.routes');
const teamMemberRoutes = require('./src/routes/teamMember.routes');
const teamRoutes = require('./src/routes/team.routes');
const roleRoutes = require('./src/routes/role.routes');

const PORT = process.env.PORT || 3000;

app.use(express.json()); // body parser

// Routes
app.use('/api/domains', domainRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/courseBatch', courseBatchRoutes);
app.use('/api/axes', axisRoutes); 
app.use('/api/teams', teamRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/taskGroup', taskGroupRoutes); 
app.use('/api/tasks', taskRoutes);
app.use('/api/task-assignments', taskAssignmentRoutes);
app.use('/api/roleAssignments', roleAssignmentRoutes);
app.use('/api/teamMembers', teamMemberRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
