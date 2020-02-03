const router = require('express').Router();
const Customer = require('../models/customer.model');

router.route('/').get((req, res) => {
  Customer.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const newCustomer = new Customer({ username });

  newCustomer
    .save()
    .then(() => res.json('User Added!!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
