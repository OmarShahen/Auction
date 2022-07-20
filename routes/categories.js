const router = require('express').Router()
const categoryController = require('../controllers/categories')

router.post('/categories', (request, response) => categoryController.addcategory(request, response))

router.get('/categories', (request, response) => categoryController.getCategories(request, response))

module.exports = router