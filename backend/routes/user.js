/* eslint-disable no-console */
const router = require('express').Router();
const User = require('../models/user.model');

/**
 * bcrypt is a library which allows you to hash
 * a password before it is stored in the database.
 *
 * This is usually so that the database admins themselves
 * cannot identify someone's password
 */
const bcrypt = require('bcryptjs');

/**
 * @swagger
 * /users:
 *  get:
 *    description: Used to get all Users
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * @swagger
 * /users:
 *  post:
 *    description: Used to add a Users
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: user
 *        description: The User to create
 *        schema:
 *          type: object
 *          required:
 *            - userName
 *            - password
 *          properties:
 *            userName:
 *              type: string
 *            password:
 *              type: string
 *            customerInfo:
 *              type: object
 *              properties:
 *                disability:
 *                  type: string
 *                accountBalance:
 *                  type: number
 *            managerInfo:
 *              type: object
 *              properties:
 *                branch:
 *                  type: number
 *    responses:
 *      '200':
 *        description: User successfully created
 */
router.route('/').post(async (req, res) => {
  const userName = req.body.userName;
  const customerInfo = req.body.customerInfo;
  const managerInfo = req.body.managerInfo;
  const password = req.body.password;

  return bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      console.log(err);
    }
    const newUser = new User({
      userName,
      password: hash,
      customerInfo,
      managerInfo
    });

    await newUser
      .save()
      .then(() => res.json(newUser))
      .catch(err => res.status(400).json('Error: ' + err));
  });
});

router.route('/:id').get(async (req, res) => {
  await User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error ' + err));
});

router.route('/:id').delete(async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User Deleted'))
    .catch(err => res.status(400).json('Error ' + err));
});

router.route('/update/:id').post(async (req, res) => {
  await User.findById(req.params.id)
    .then(user => {
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
          console.log(err);
        }
        user.userName = req.body.userName;
        user.password = hash;
        user.customerInfo = req.body.customerInfo;
        user.managerInfo = req.body.managerInfo;

        user
          .save()
          .then(() => res.json('User Updated'))
          .catch(err => res.status(400).json('Error ' + err));
      });
    })
    .catch(err => res.status(400).json('Error ' + err));
});

module.exports = router;
