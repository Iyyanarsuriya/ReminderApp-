const express = require('express');
const router = express.Router();
const workTypeController = require('../controllers/workTypeController');
const authenticateToken = require('../middlewares/authMiddleware');

router.use(authenticateToken);

router.post('/', workTypeController.createWorkType);
router.get('/', workTypeController.getWorkTypes);
router.delete('/:id', workTypeController.deleteWorkType);

module.exports = router;
