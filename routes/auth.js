const router = require('express').Router()
const authController = require('../controllers/auth')

router.post('/bidder/sign-up', (request, response) => authController.bidderSignUp(request, response))

router.post('/bidder/login', (request, response) => authController.bidderLogin(request, response))

router.post('/auction-hall/sign-up', (request, response) => authController.auctionHallSignUp(request, response))

router.post('/auction-hall/login', (request, response) => authController.auctionHallLogin(request, response))

module.exports = router