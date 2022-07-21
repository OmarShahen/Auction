const utils = require('../utils/utils')
const checkJoinAuction = (auctionData) => {

    const { auctionId, bidderId } = auctionData

    if(!auctionId) return {
        isAccepted: false,
        message: 'auction Id is required',
        field: 'auctionId'
    }

    if(!utils.isObjectId(auctionId)) return {
        isAccepted: false,
        message: 'auction Id is invalid',
        field: 'auctionId'
    }

    if(Number.isInteger(auctionId)) return {
        isAccepted: false,
        message: 'auction Id must be Object Id',
        field: 'auctionId'
    }

    if(!bidderId) return {
        isAccepted: false,
        message: 'bidder Id is required',
        field: 'bidderId'
    }

    if(!utils.isObjectId(bidderId)) return {
        isAccepted: false,
        message: 'bidder Id is invalid',
        field: 'bidderId'
    }

    if(Number.isInteger(bidderId)) return {
        isAccepted: false,
        message: 'bidder Id must be Object Id',
        field: 'bidderId'
    }

    return { isAccepted: true, message: 'valid data', data: auctionData }

}

const checkBid = (bidData) => {

    const { auctionId, bidderId, value } = bidData

    if(!auctionId) return {
        isAccepted: false,
        message: 'auction Id is required',
        field: 'auctionId'
    }

    if(!utils.isObjectId(auctionId)) return {
        isAccepted: false,
        message: 'auction Id is invalid',
        field: 'auctionId'
    }

    if(Number.isInteger(auctionId)) return {
        isAccepted: false,
        message: 'auction Id must be Object Id',
        field: 'auctionId'
    }

    if(!bidderId) return {
        isAccepted: false,
        message: 'bidder Id is required',
        field: 'bidderId'
    }

    if(!utils.isObjectId(bidderId)) return {
        isAccepted: false,
        message: 'bidder Id is invalid',
        field: 'bidderId'
    }

    if(Number.isInteger(bidderId)) return {
        isAccepted: false,
        message: 'bidder Id must be Object Id',
        field: 'bidderId'
    }

    if(!value) return { isAccepted: false, message: 'bidding value is required', field: 'value' }

    if(!Number.isInteger(value)) return { isAccepted: false, message: 'bidding value must be integer', field: 'value' }

    return { isAccepted: true, message: 'valid data', data: bidData }
}

module.exports = { checkJoinAuction, checkBid }