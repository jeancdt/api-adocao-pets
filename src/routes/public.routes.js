const express = require('express');
const PublicController = require('../controllers/public.controller');
const router = express.Router();

router.get('/home', PublicController.home);

module.exports = router;
