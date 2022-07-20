const auctionDataValidator = require('../validations/auction')
const itemDataValidator = require('../validations/item')
const UserModel = require('../models/User')
const AuctionModel = require('../models/Auction')
const CategoryModel = require('../models/Category')
const utils = require('../utils/utils')

const addAuction = async (request, response) => {

    try {

        const auctionValidation = auctionDataValidator.auction(request.body)
        if(!auctionValidation.isAccepted) {
            return response.status(406).json({
                success: auctionValidation.isAccepted,
                message: auctionValidation.message,
                field: auctionValidation.field
            })
        }

        const itemValidation = itemDataValidator.item(request.body)
        if(!itemValidation.isAccepted) {
            return response.status(406).json({
                success: itemValidation.isAccepted,
                message: itemValidation.message,
                field: itemValidation.field
            })
        }

        const { auctionHallId, startingPrice, startDate, endDate, isPrivate } = request.body

        const { itemName, itemDescription, itemCategory, imageURL } = request.body

        const auctionHallsList = await UserModel.find({ _id: auctionHallId, role: 'auctionHall' })

        if(auctionHallsList.length == 0) {
            return response.status(406).json({
                success: false,
                message: 'no auction hall with that Id',
                field: 'auctionHallId'
            })
        }

        const auctionHallItemsList = await AuctionModel.find({ auctionHallId, 'item.name': itemName })

        if(auctionHallItemsList.length != 0) {
            return response.status(406).json({
                success: false,
                message: 'already registered item with that name in your auction hall',
                field: 'itemName'
            })
        }

        const categoriesList = await CategoryModel.find({ name: itemCategory })

        if(categoriesList.length == 0) {
            return response.status(406).json({
                success: false,
                message: 'category does not exist',
                field: 'itemCategory'
            })
        }

        const newAuctionData = {
            auctionHallId,
            startingPrice,
            startDate,
            endDate,
            isPrivate,
            item: {
                name: itemName,
                description: itemDescription,
                category: itemCategory,
                imageURL: imageURL
            }
        }

        const newAuction = new AuctionModel(newAuctionData)
        let createdAuction = await newAuction.save()

        return response.status(200).json({
            success: true,
            message: 'auction created successfully',
            auction: createdAuction
        })

    } catch(error) {
        console.error(error)
        return response.status(500).json({
            success: false,
            message: 'internal server error',
            error: error.message
        })
    }
}

const getAuction = async (request, response) => {

    try {

        const { auctionId } = request.params

        if(!utils.isObjectId(auctionId)) {
            return response.status(406).json({
                success: false,
                message: 'invalid auction hall Id'
            })
        }

        const auction = await AuctionModel.findById(auctionId)

        return response.status(200).json({
            success: true,
            auction
        })

    } catch(error) {
        console.error(error)
        return response.status(500).json({
            success: false,
            message: 'internal server error',
            error: error.message
        })
    }
}

const getAuctions = async (request, response) => {

    try {

        const { itemName, category } = request.query
        let auctions = []

        if(itemName && category) {

            auctions = await AuctionModel
            .find({ $text: { $search: itemName }, category })
            .sort({ endDate: 1 })

        } else if(itemName) {

            auctions = await AuctionModel
            .find({ $text: { $search: itemName } })
            .sort({ endDate: 1 })

        } else if(category) {

            auctions = await AuctionModel
            .find({ category })
            .sort({ endDate: 1 })

        } else {
            auctions = await AuctionModel
            .find()
            .sort({ endDate: 1 })
        }

        return response.status(200).json({
            success: true,
            auctions
        })

    } catch(error) {
        console.error(error)
        return response.status(500).json({
            success: false,
            message: 'internal server error',
            error: error.message
        })
    }
}




module.exports = { addAuction, getAuction, getAuctions }