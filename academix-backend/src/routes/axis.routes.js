const router = require('express').Router();
const axisController = require('../controllers/axis.controller');

router.get('/', axisController.getAll);
router.get('/:id', axisController.getById);
router.post('/', axisController.create);
router.put('/:id', axisController.update);
router.delete('/:id', axisController.remove);

module.exports = router;