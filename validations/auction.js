const validator = require('../utils/utils')
const moment = require('moment')

const auction = (auctionData) => {

    const { auctionHallId, startingPrice, startDate, endDate, isPrivate } = auctionData

    if(!auctionHallId) return { isAccepted: false, message: 'auction hall Id is required', field: 'auctionHallId' }

    if(!validator.isObjectId(auctionHallId)) return { isAccepted: false, message: 'invalid auction hall Id', field: 'auctionHallId' }
    
    if(!Number.isInteger(startingPrice)) return { isAccepted: false, message: 'starting price must be an integer', field: 'startingPrice' } 

    if(!startDate) return { isAccepted: false, message: 'auction start date is required', field: 'startDate' }

    const isValidStartDate = moment(startDate, 'MM/DD/YYYY LT', true).isValid()
    if(!isValidStartDate) return { isAccepted: false, message: 'invalid date formate for auction start date', field: 'startDate' }

    const momentDate = new Date()
    const auctionStartDate = new Date(startDate)
    if(momentDate > auctionStartDate) return { isAccepted: false, message: 'start date is already passed', field: 'startDate' }

    if(!endDate) return { isAccepted: false, message: 'auction end date is required', field: 'endDate' }

    const isValidEndDate = moment(endDate, 'MM/DD/YYYY LT', true).isValid()
    if(!isValidEndDate) return { isAccepted: false, message: 'invalid date formate for auction end date', field: 'endDate' }
    
    const auctionEndDate = new Date(endDate)
    if(auctionStartDate > auctionEndDate) return { isAccepted: false, message: 'auction end date is before auction start date', field: 'endDate' }


    return { isAccepted: true, message: 'valid data', data: auctionData }

}

module.exports = { auction }