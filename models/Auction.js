const mongoose = require('mongoose')
const ItemSchema = require('./Item')
const BidSchema = require('./Bid')

const Schema = mongoose.Schema

const auctionSchema = new Schema({

    auctionHallId: { type: String, required: true },
    winnerId: { type: String },
    startingPrice: { type: Number, required: true },
    currentPrice: { type: Number },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isPrivate: { type: Boolean, default: false },
    isSold: { type: Boolean, default: false },
    isExpired: { type: Boolean, default: false },
    item: ItemSchema,
    bids: [ BidSchema ]

}, { timestamps: true })

module.exports = mongoose.model('Auction', auctionSchema)