const router = require('express').Router();
const roleAssignmentController = require('../controllers/roleAssignment.controller');

router.get('/', roleAssignmentController.getAll);
router.get('/:id', roleAssignmentController.getById);
router.post('/', roleAssignmentController.create);
router.put('/:id', roleAssignmentController.update);
router.delete('/:id', roleAssignmentController.remove);

module.exports = router;
