const express = require('express');
const router = express.Router();
const TaskModel = require('./model')
// Create an instance of model SomeModel
var awesome_instance = new SomeModel({ name: 'awesome' });

// Save the new model instance, passing a callback
awesome_instance.save(function (err) {
  if (err) return handleError(err);
  // saved!
});
router.get('/', (req, res) => {
    console.log('Task Get.')
    res.send('All tasks')
});

module.exports = router;