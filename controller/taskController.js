const Task = require('../models/Task');
const User = require('../models/User');

// Add a new task
const addTask = async (req, res) => {
  const { title, description, status, currentUser } = req.body;
      
    try {
      const usermail = await User.findOne({ email: currentUser });

      const newTask = new Task({
        title,
        description,
        status,
        user: usermail._id
       });
      
      if (!newTask.title || !newTask.status) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      await newTask.save();
      res.status(200).json(newTask);
    } catch (err) {
      console.error('Error creating task:', err);
      res.status(400).json({ message: err.message });
    }
  };
  
  // Delete a task by ID
  const deleteTask = async (req, res) => {
    const { id } = req.body;
    
    try {
       
       //  Find the task ID to delete 
       const taskObj = await Task.findOne({ _id: id});
       console.log("task id to delete:", taskObj._id);
  
      const taskToDelete = await Task.findOne({ _id: taskObj._id });
  
      if (!taskToDelete) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      await Task.findByIdAndDelete(taskObj._id);
  
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
      console.error('Error deleting tasks for user:', err);
      res.status(500).json({ message: err.message });
    }
  };
  
// Get all tasks for the authenticated user
const getTasksForUser = async (req, res) => {
  const { currentUser } = req.body;

  try {
    // Check if the user with the given user Email exists
    const usermail = await User.findOne({ email: currentUser });
    
    // Find tasks for the user based on their _id
    const tasks = await Task.find({ user: usermail._id });

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks for user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a task by ID
const updateTask = async (req, res) => {
  const { id, title, description, status } = req.body;

  try {
    // Find the task by ID
    const taskToUpdate = await Task.findById(id);

    if (!taskToUpdate) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update task fields if provided
    if (title) {
      taskToUpdate.title = title;
    }
    if (description) {
      taskToUpdate.description = description;
    }
    if (status) {
      taskToUpdate.status = status;
    }

    // Save the updated task
    await taskToUpdate.save();

    res.status(200).json(taskToUpdate);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { addTask, getTasksForUser, deleteTask, updateTask };
