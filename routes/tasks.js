const express = require('express');
const Task = require('../models/task');

const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const generateRandomId = () => {
    return Math.floor(10000 + Math.random() * 90000).toString(); // Ensures it's always five digits
};

 // Create a task
router.post('/add', async (req, res) => {
    const customId = generateRandomId(); 
    const task = new Task({
        task: req.body.task,
        status: req.body.status,
        customId: customId,
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



// Update a task
router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).send('Task not found');

        // Update task properties
        if (req.body.task) {
            task.task = req.body.task; // Update task text
        }
        if (req.body.status) {
            task.status = req.body.status; // Update status if provided
        }
        if (req.body.created_at) {
            task.status = req.body.created_at; // Update created time 
        }
        
        const updatedTask = await task.save(); // Save changes
        res.json(updatedTask); // Return the updated task
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Delete a task
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).send('Task not found');
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
