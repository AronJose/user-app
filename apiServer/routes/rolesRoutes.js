const rolesController = require('../controller/rolesController.js');
const router = require('express').Router();

router.post('/', rolesController.addRoles);
router.get('/', rolesController.getRoles);


module.exports = router