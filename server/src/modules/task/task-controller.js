const express = require('express');
const router = express.Router();
import TaskDAO from './task-service'
import auth from '../../middleware/auth'
const logger = require('../../startup/logger')
// Create 
router.post('/create', auth, async (req, res, next) => {
    try {
        // logger.error(req.body)
        // logger.error(req.userId)
        let msg = await TaskDAO.createTask(req.body,req.userId)
        res.send(msg)
    } catch (err) {
        logger.error(err.stack)
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
        logger.error(err.stack)
        next(err)
    }

});

// Update
router.put('/update', auth, async (req, res, next) => {
    try {
        await TaskDAO.updateTaskById(req.body.updateDetails,req.body.taskId,req.userId)
        res.send("Task updated successfully")
    } catch (err) {
        logger.error(err.stack)
        next(err)
    }
})

// Delete
router.delete('/delete', auth, async (req, res, next) => {
    try {
        await TaskDAO.deleteTaskById(req.body.taskId,req.userId)
        res.send("Task deleted successfully")
    } catch (err) {
        logger.error(err.stack)
        next(err)
    }
})


module.exports = router;