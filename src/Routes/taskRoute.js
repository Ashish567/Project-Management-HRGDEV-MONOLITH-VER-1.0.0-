const express = require('express');

const taskController = require('./../Controllers/taskController');
const authController = require('./../Controllers/authController');
const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router.post('/', taskController.postTask);
router.get('/:id', taskController.getTask);
router.get('/', taskController.getTasks);

module.exports = router;
