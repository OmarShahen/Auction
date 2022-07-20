const requestDataValidator = require('../validations/auth')
const UserModel = require('../models/User')
const bcrypt = require('bcrypt')
const config = require('../config/config')
const jwt = require('jsonwebtoken')
const utils = require('../utils/utils')


const bidderSignUp = async (request, response) => {

    try {

        const validation = requestDataValidator.bidderSignUp(request.body)

        if(!validation.isAccepted) {
            return response.status(406).json({
                success: validation.isAccepted,
                message: validation.message,
                field: validation.field
            })
        }

        const { username, email, password } = validation.data

        const usedMail = await UserModel.find({ email })

        if(usedMail.length != 0)
            return response.status(406).json({
                success: false,
                message: 'email is already used',
                field: 'email'
            })

        const bidderData = {
            username,
            email,
            password: bcrypt.hashSync(password, config.HASH_SALT),
            role: 'bidder'
        }

        const createBidder = new UserModel(bidderData)
        let newBidder = await createBidder.save()
        
        const token = jwt.sign({ user: bidderData }, config.SECRET_KEY, { expiresIn: '30d' })

        newBidder = utils.cleanObject(newBidder._doc, { password: '', updatedAt: '', __v: '' })


        return response.status(200).json({
            success: true,
            message: 'bidder account created successfully',
            bidder: newBidder,
            token: token
        })

    } catch(error) {
        console.error(error)
        return response.status(500).json({
            success: true,
            message: 'internal server error',
            error: error.message
        })
    }
}

const bidderLogin = async (request, response) => {

    try {

        const loginValidation = requestDataValidator.login(request.body)

        if(!loginValidation.isAccepted) {
            return response.status(406).json({
                success: loginValidation.isAccepted,
                message: loginValidation.message,
                field: loginValidation.field
            })
        }

        const { email, password } = loginValidation.data

        const biddersList = await UserModel.find({ email, role: 'bidder' })
        
        if(biddersList.length == 0) {
            return response.status(406).json({
                success: false,
                message: 'account does not exist',
                field: 'email'
            })
        }

        let bidder = biddersList[0]

        if(!bcrypt.compareSync(password, bidder.password)) {
            return response.status(406).json({
                success: false,
                message: 'bad credentials',
                field: 'password'
            })
        }

        bidder = utils.cleanObject(bidder._doc, { password: '', updatedAt: '', __v: '' })

        const token = jwt.sign({ user: bidder }, config.SECRET_KEY, { expiresIn: '30d' })

        return response.status(200).json({
            success: true,
            message: 'login successfully',
            bidder: bidder,
            token: token
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

const auctionHallSignUp = async (request, response) => {

    try {

        const validation = requestDataValidator.auctionHallSignUp(request.body)

        if(!validation.isAccepted) {
            return response.status(406).json({
                success: validation.isAccepted,
                message: validation.message,
                field: validation.field
            })
        }

        const { auctionHallName, email, password } = validation.data

        const namesUsed = await UserModel.find({ username: auctionHallName, role: 'auctionHall' })
        if(namesUsed.length != 0) {
            return response.status(406).json({
                success: false,
                message: 'auction hall name is required',
                field: 'auctionHallName'
            })
        }

        const usedEmails = await UserModel.find({ email })
        if(usedEmails.length != 0) {
            return response.status(406).json({
                success: false,
                message: 'email is already used',
                field: 'email'
            })
        }

        const auctionHallData = {
            username: auctionHallName,
            email,
            password: bcrypt.hashSync(password, config.HASH_SALT),
            role: 'auctionHall'
        }

        const createAuctionHall = new UserModel(auctionHallData)
        let newAuctionHall = await createAuctionHall.save()

        const token = jwt.sign({ user: auctionHallData }, config.SECRET_KEY, { expiresIn: '30d' })

        newAuctionHall = utils.cleanObject(newAuctionHall._doc, { password: '', updatedAt: '', __v: '' })

        return response.status(200).json({
            success: true,
            message: 'auction hall account is created successfully',
            auctionHall: newAuctionHall,
            token: token
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

const auctionHallLogin = async (request, response) => {

    try {

        const loginValidation = requestDataValidator.login(request.body)

        if(!loginValidation.isAccepted) {
            return response.status(406).json({
                success: loginValidation.isAccepted,
                message: loginValidation.message,
                field: validation.field
            })
        }

        const { email, password } = loginValidation.data

        const auctionHallList = await UserModel.find({ email, role: 'auctionHall' })
        
        if(auctionHallList.length == 0) {
            return response.status(406).json({
                success: false,
                message: 'account does not exist',
                field: 'email'
            })
        }

        let auctionHall = auctionHallList[0]

        if(!bcrypt.compareSync(password, auctionHall.password)) {
            return response.status(406).json({
                success: false,
                message: 'bad credentials',
                field: 'password'
            })
        }

        auctionHall = utils.cleanObject(auctionHall._doc, { password: '', updatedAt: '', __v: '' })

        const token = jwt.sign({ user: auctionHall }, config.SECRET_KEY, { expiresIn: '30d' })

        return response.status(200).json({
            success: true,
            message: 'login successfully',
            auctionHall: auctionHall,
            token: token
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

module.exports = { bidderSignUp, bidderLogin, auctionHallSignUp, auctionHallLogin }