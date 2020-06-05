const express = require('express');
const router = express.Router();
import TaskDAO from 'task-service'

router.get('/all',auth ,async (req, res) => {
    try {
        res.send(TaskDAO.getAllTasks(req.userId))
    } catch {

    }
    
});

router

module.exports = router;