const express = require('express');
const { createOrg, updateOrg, getAllOrgs } = require('../controllers/orgController');
const router = express.Router(); // instance of the class

router.post('/', createOrg);
router.patch('/:id', updateOrg);
router.get('/', getAllOrgs);

module.exports = router;