const express = require('express');
const router = express.Router();
import TaskDAO from 'task-service'

// Create 
router.post('/create', auth, async (req, res, next) => {
    try {
        await TaskDAO.createTask(req.userId)
        res.send("Task created successfully")
    } catch (err) {
        next(err)
    }
})

// Read
router.get('/all', auth, async (req, res, next) => {
    try {
        res.send(
            await TaskDAO.getAllTasks(req.userId)
            )
    } catch (err) {
        next(err)
    }

});

// Update
router.put('/update', auth, async (req, res, next) => {
    try {
        await TaskDAO.updateTaskById(req.updateDetails,req.taskId,req.userId)
        res.send("Task updated successfully")
    } catch (err) {
        next(err)
    }
})

// Delete
router.delete('/delete', auth, async (req, res, next) => {
    try {
        await TaskDAO.deleteTaskById(req.taskId,req.userId)
        res.send("Task deleted successfully")
    } catch (err) {
        next(err)
    }
})


module.exports = router;