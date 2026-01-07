const express = require('express');
const router = express.Router();
const memberRoleController = require('../controllers/memberRoleController');
const authenticateToken = require('../middlewares/authMiddleware');

router.use(authenticateToken);

router.get('/', memberRoleController.getRoles);
router.post('/', memberRoleController.addRole);
router.delete('/:id', memberRoleController.deleteRole);

module.exports = router;
