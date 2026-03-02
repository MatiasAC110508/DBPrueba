const express = require('express');
const router = express.Router();
const getDeletedController = require('../controllers/deleter_controller');

// GET/deleted/:name/
router.get('/:email/history', getDeletedController.getDeletedProduct);

module.exports = router; 