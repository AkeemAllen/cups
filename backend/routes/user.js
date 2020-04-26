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
 *    tags:
 *      - Users
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
 *    tags:
 *      - Users
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
 *              required: false
 *              properties:
 *                disability:
 *                  type: string
 *                accountBalance:
 *                  type: number
 *            managerInfo:
 *              type: object
 *              required: false
 *              properties:
 *                branch:
 *                  type: number
 *            isAdmin:
 *              type: boolean
 *    responses:
 *          '200':
 *            description: A successful response
 *          '400':
 *            description: An error occurred
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
 * /users/{id}:
 *  get:
 *    tags:
 *      - Users
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *    description: Return a single User
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: User Not Found
 *      '400':
 *        description: An error occurred
 */
router.route('/:id').get(async (req, res) => {
  await User.findById(req.params.id)
    .then(user => {
      if (user === null) {
        res.status(404).json('User Not Found');
      } else {
        res.json(user);
      }
    })
    .catch(err => res.status(400).json('Error ' + err));
});

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *    tags:
 *      - Users
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          retuired: true
 *    description: Deletes a single User
 *    responses:
 *      '200':
 *        description: User Deleted successfully
 *      '404':
 *        description: User Not Found
 *      '400':
 *        description: An error occurred
 */
router.route('/:id').delete(async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
    .then(user => {
      if (user === null) {
        res.status(404).json('User Not Found');
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => res.status(400).json('Error ' + err));
});

/**
 * @swagger
 * /users/update/{id}:
 *  post:
 *    tags:
 *      - Users
 *    description: Updates a User's Information
 *    consumes:
 *      - application/json
 *    responses:
 *      '200':
 *        description: User Updated Successfully
 *      '404':
 *        description: User Not Found
 *      '400':
 *        description: Error Occurred
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
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
        if (user === null) {
          res.status(404).json('User Not Found');
        }
        req.body.userName !== undefined
          ? (user.userName = req.body.userName)
          : null;
        req.body.password !== undefined ? (user.password = hash) : null;
        req.body.customerInfo !== undefined
          ? (user.customerInfo = req.body.customerInfo)
          : null;
        req.body.managerInfo !== undefined
          ? (user.managerInfo = req.body.managerInfo)
          : null;
        req.body.isAdmin !== undefined
          ? (user.isAdmin = req.body.isAdmin)
          : null;

        user
          .save()
          .then(() => res.status(200).json('User Updated'))
          .catch(err => res.status(400).json('Error ' + err));
      });
    })
    .catch(err => res.status(400).json('Error ' + err));
});

/**
 * @swagger
 * /users/login:
 *  post:
 *    tags:
 *     - Users
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
 *      '404':
 *        description: User Not Found
 *      '400':
 *        description: Unable to log in
 */
router.route('/login').post(async (req, res) => {
  const username = req.body.userName;
  const password = req.body.password;

  await User.findOne({ userName: username })
    .then(user => {
      if (!user) {
        res.status(404).json('User Not Found');
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
