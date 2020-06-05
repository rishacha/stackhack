const express = require('express');
const router = express.Router();
const TaskModel = require('./task-model')

router.get('/all', async (req, res) => {
    let tasks = await TaskModel.find({})
    res.send(tasks)
});

module.exports = router;