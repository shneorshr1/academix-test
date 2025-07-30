const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskAssignment.controller');

router.get('/', controller.getAllTaskAssignments);
router.get('/:id', controller.getTaskAssignmentById);
router.post('/', controller.createTaskAssignment);
router.put('/:id', controller.updateTaskAssignment);
router.delete('/:id', controller.deleteTaskAssignment);

module.exports = router;
