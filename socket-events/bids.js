const AuctionModel = require('../models/Auction')
const UserModel = require('../models/User')
const utils = require('../utils/utils')
const mongoose = require('mongoose')
const { checkJoinAuction, checkBid } = require('../validations/bid')

module.exports = io => {

    io.on('connection', socket => {
        
        socket.on('join:auction', async (auctionData, callback) => {

            try {

                const validation = checkJoinAuction(auctionData)

                if(!validation.isAccepted) return socket.emit('join:auction:error', {
                    success: validation.isAccepted,
                    message: validation.message,
                    field: validation.field
                })

                const { auctionId, bidderId } = validation.data

                const auctions = await AuctionModel.find({ _id: auctionId })

                if(auctions.length == 0) return socket.emit('join:auction:error', {
                    success: false,
                    message: 'auction Id does not exist',
                })

                const bidders = await UserModel.find({ _id: bidderId })

                if(bidders.length == 0) return socket.emit('join:auction:error', {
                    success: false,
                    message: 'bidder Id does not exist'
                }) 


                socket.join(auctionId)

                return callback({
                    success: true,
                    message: 'joined the room successfully'
                })


            } catch(error) {
                console.error(error)
                return socket.emit('error', {
                    success: false,
                    message: 'internal server error',
                    error: error.message
                })
            }

        })

        socket.on('bid', async (bidData, callback) => {

            try {

                const validation = checkBid(bidData)

                if(!validation.isAccepted) return socket.emit('bid:error', {
                    success: validation.isAccepted,
                    message: validation.message,
                    field: validation.field
                })

                const { auctionId, bidderId, value } = validation.data

                const auctions = await AuctionModel.find({ _id: auctionId })

                if(auctions.length == 0) return socket.emit('bid:error', {
                    success: false,
                    message: 'auction Id does not exist',
                })

                const bidders = await UserModel.find({ _id: bidderId })

                if(bidders.length == 0) return socket.emit('bid:error', {
                    success: false,
                    message: 'bidder Id does not exist'
                })

                const auction = auctions[0]

                const AUCTION_START_DATE = new Date(auction.startDate)
                const AUCTION_END_DATE = new Date(auction.endDate)
                const NOW_DATE = new Date()

                /*if(AUCTION_START_DATE > NOW_DATE) return socket.emit('bid:error', {
                    success: false,
                    message: 'auction did not start yet'
                })*/

                if(AUCTION_END_DATE < NOW_DATE) return socket.emit('bid:error', {
                    success: false,
                    message: 'auction is finished'
                })

                const BIDS = auction.bids

                if(auction.startingPrice > value) return socket.emit('bid:error', {
                    success: false,
                    message: `bidding value must be greater than the starting price ${auction.startingPrice}`
                })

                if(auction.currentBid >= value) return socket.emit('bid:error', {
                    success: false,
                    message: `bidding value must be greater than ${auction.currentBid}`
                })

                const MIN_NEW_BID = auction.currentBid + auction.biddingValue

                if(MIN_NEW_BID > value) return socket.emit('bid:error', {
                    success: false,
                    message: `your bid must be at least ${MIN_NEW_BID}`
                })

                const bidderData = bidders[0]

                const newBid = {
                    bidderId,
                    bidderName: bidderData.username,
                    bidderEmail: bidderData.email,
                    value: value
                }


                const updatedAuction = await AuctionModel
                .findByIdAndUpdate(
                    auctionId,
                    { $push: { bids: newBid }, currentBid: value },
                    { new: true }
                )
                
                bidderData.password = ''

                return io.to(auctionId).emit('bid:success', {
                    success: true,
                    message: 'new bid successfully',
                    auction: updatedAuction,
                    bidder: bidderData
                })

            } catch(error) {
                console.error(error)
                return socket.emit('error', {
                    success: false,
                    message: 'internal server error',
                    error: error.message
                })
            }
        })
    })
}