const router = require('express').Router();
const Manager = require('../models/manager.model');

router.route('/').get((req, res) => {
  Manager.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const newManager = new Manager({ username });

  newManager
    .save()
    .then(() => res.json('User Added!!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
