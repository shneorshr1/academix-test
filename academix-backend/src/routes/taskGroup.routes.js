const express = require('express');
const router = express.Router();
const taskGroupController = require('../controllers/taskGroup.controller');

router.get('/', taskGroupController.getAll);
router.get('/:id', taskGroupController.getById);
router.post('/', taskGroupController.create);
router.put('/:id', taskGroupController.update);
router.delete('/:id', taskGroupController.remove);

module.exports = router;