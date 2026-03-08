const {Router} = require('express');
const {UserController} = require('../controllers/UserController');

const router = Router();

router.get('/health', (req, res) => {
  res.status(200).json({status: 'ok',uptime: process.uptime()});
});

router.get('/users',UserController.listAll);
router.get('/users/:id',UserController.findOne);
router.post('/users',UserController.create);
router.put('/users/:id',UserController.update);
router.delete('/users/:id',UserController.delete);

module.exports = router;