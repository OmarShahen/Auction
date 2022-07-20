const router = require('express').Router()
const auctionController = require('../controllers/auctions')

router.post('/auctions', (request, response) => auctionController.addAuction(request, response))

router.get('/auctions/:auctionId', (request, response) => auctionController.getAuction(request, response))

router.get('/auctions', (request, response) => auctionController.getAuctions(request, response))

module.exports = router