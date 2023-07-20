const express = require('express');
const router = express.Router();
const controller = require('../controllers/moviesController');
const admin = require('../middlewares/admin');
const auth = require('../middlewares/auth');

router.post('/movies', [auth.check, admin.check], controller.create);
router.put('/:id', [auth.check, admin.check], controller.update);
router.delete('/:id', [auth.check, admin.check], controller.delete);
router.get('/movies', auth.check,controller.list);
router.get('/movies/:id', auth.check,controller.find);


module.exports = router;