const express = require('express');
const router = express.Router();
const user = require('./controllers/usersController.js');
const VN = require('./controllers/visualNovelsController.js');
const authenticate = require('./middlewares/auth.js');

//User Router
router.route('/users')
    .post(user.create)
    .get(user.findAll);
router.post('/users-login', user.login);
router.route('/users/:id')
    .get(authenticate, user.find)
    .put(user.update)
    .delete(authenticate, user.remove);

//VN Router
router.route('/visualNovels')
    .post(authenticate, VN.create)
    .get(authenticate, VN.findAll);
router.route('/visualNovels/:id')
    .get(authenticate, VN.find)
    .put(authenticate, VN.update)
    .delete(authenticate, VN.remove);
router.put('/visualNovels-like/:id', VN.like);

module.exports = router;