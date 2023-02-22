const express = require('express');

const projectController = require('./../Controllers/projectController');
const authController = require('./../Controllers/authController');
const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router.post('/', projectController.postProject);
router.get('/:id', projectController.getProject);
router.get('/', projectController.getProjects);

module.exports = router;
