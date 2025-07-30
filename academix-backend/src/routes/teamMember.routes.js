const router = require('express').Router();
const teamMemberController = require('../controllers/teamMember.controller');

router.get('/', teamMemberController.getAll);
router.get('/:id', teamMemberController.getById);
router.post('/', teamMemberController.create);
router.put('/:id', teamMemberController.update);
router.delete('/:id', teamMemberController.remove);

module.exports = router;
