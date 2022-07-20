const validator = require('../utils/utils')


const bidderSignUp = (bidderData) => {

    const { username, email, password } = bidderData

    if(!username) return { isAccepted: false, message: 'username is required' }

    if(!validator.isUsernameValid(username)) return { isAccepted: false, message: 'username entered has invalid characters' }

    const splitUsername = username.split(' ')

    if(splitUsername.length != 2) return { isAccepted: false, message: 'username must be two words only' }

    if(!email) return { isAccepted: false, message: 'email is required' }

    if(!validator.isEmailValid(email)) return { isAccepted: false, message: 'invalid email formate' } 
    
    if(!password) return { isAccepted: false, message: 'password is required' }

    return { isAccepted: true, message: 'data is valid', data: bidderData } 

}

const auctionHallSignUp = (auctionHallData) => {

    const { auctionHallName, email, password } = auctionHallData

    if(!auctionHallName)  return { isAccepted: false, message: 'auction hall name is required' }

    if(!validator.isAuctionHallNameValid(auctionHallName)) return { isAccepted: false, message: 'auction hall name entered has invalid characters' }

    if(!email) return { isAccepted: false, message: 'email is required' }

    if(!validator.isEmailValid(email)) return { isAccepted: false, message: 'invalid email formate' } 
    
    if(!password) return { isAccepted: false, message: 'password is required' }

    return { isAccepted: true, message: 'data is valid', data: auctionHallData }


}

const login = (userData) => {

    const { email, password } = userData

    if(!email) return { isAccepted: false, message: 'email is required' }

    if(!validator.isEmailValid(email)) return { isAccepted: false, message: 'invalid email formate' } 
    
    if(!password) return { isAccepted: false, message: 'password is required' }

    return { isAccepted: true, message: 'data is valid', data: userData }

}

module.exports = { bidderSignUp, login, auctionHallSignUp } 