const express = require('express');
const router = express.Router();
const { userLogin, addUser } = require('../controller/userController');
const { getTasksForUser, addTask, deleteTask, updateTask } = require('../controller/taskController');


// Login Route
router.post('/userLogin', userLogin);

// Add a new user
router.post('/users', addUser);

// Task route
router.post('/getTasks', getTasksForUser);
router.post('/addTask', addTask);
router.delete('/deleteTask', deleteTask);
router.post('/updateTask', updateTask);

module.exports = router;
