const express = require('express');
const router = express.Router(); 
const controller = require('../controllers/category-controller')


router.get('/', controller.get);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);


module.exports = router;