/* eslint-disable no-console */
const router = require('express').Router();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

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
 *    description: Returns all Users
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: An error occurred
 */
router.route('/').get(async (req, res) => {
  await User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * @swagger
 * /users:
 *  post:
 *    description: Add a User
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
 *            isAdmin:
 *              type: boolean
 */
router.route('/').post(async (req, res) => {
  const userName = req.body.userName;
  const customerInfo = req.body.customerInfo;
  const managerInfo = req.body.managerInfo;
  const password = req.body.password;
  const isAdmin = req.body.isAdmin;

  const salt = await bcrypt.genSalt();

  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    userName,
    password: hashedPassword,
    customerInfo,
    managerInfo,
    isAdmin
  });

  return newUser
    .save()
    .then(() => res.json(newUser))
    .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * @swagger
 * /users/:id:
 *  get:
 *    description: Return a single User
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: An error occurred
 */
router.route('/:id').get(async (req, res) => {
  await User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error ' + err));
});

/**
 * @swagger
 * /users/:id:
 *  delete:
 *    description: Deletes a single User
 *    response:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: An error occurred
 */
router.route('/:id').delete(async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User Deleted'))
    .catch(err => res.status(400).json('Error ' + err));
});

/**
 * @swagger
 * /users/update/:id:
 *  post:
 *    description: Updates a User's Information
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: user
 *        description: The User to edit
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
 *            isAdmin:
 *              type: boolean
 */
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
        user.isAdmin = req.body.isAdmin;

        user
          .save()
          .then(() => res.json('User Updated'))
          .catch(err => res.status(400).json('Error ' + err));
      });
    })
    .catch(err => res.status(400).json('Error ' + err));
});

/**
 * @swagger
 * /users/login:
 *  post:
 *    description: Allows an existing User to log in
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: user
 *        description: The User to Log In
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
 *    responses:
 *      '200':
 *        description: User Logged in
 *      '400':
 *        description: User not logged in
 */
router.route('/login').post(async (req, res) => {
  const username = req.body.userName;
  const password = req.body.password;

  await User.findOne({ userName: username })
    .then(user => {
      if (!user) {
        res.status(400).json('User Not Found');
        return null;
      } else {
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;

          if (isMatch) {
            jwt.sign({ user }, process.env.JWT_SECRET, (err, token) => {
              if (err) throw err;
              res.status(200).json({ token });
            });
          } else {
            res.status(400).json('Login Failed');
          }
        });
      }
    })
    .catch(err => {
      res.status(400).json(`Oops!! Something Went Wrong` + err);
    });
});

module.exports = router;
