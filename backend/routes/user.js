const router = require('express').Router();
const User = require('../models/user.model');
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

  // eslint-disable-next-line handle-callback-err
  return bcrypt.hash(password, 10, function(err, hash) {
    const newUser = new User({
      userName,
      password: hash,
      customerInfo,
      managerInfo
    });

    return newUser
      .save()
      .then(() => res.json(newUser))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  // .catch(err => console.log('Error' + err));
});
// .catch(err => console.log('Error' + err));
module.exports = router;
