const express = require('express');
const DebugController = require('../controllers/debug.controller');
const router = express.Router();

router.get('/main', DebugController.main);

module.exports = router;
