const router = require('express').Router();
const User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
  const userName = req.body.userName;
  const customerInfo = req.body.customerInfo;
  const managerInfo = req.body.managerInfo;
  const newUser = new User({ userName, customerInfo, managerInfo });

  newUser
    .save()
    .then(() => res.json('User Added!!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
