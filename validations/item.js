const validator = require('../utils/utils')

const item = (itemData) => {

    const { itemName, itemDescription, itemCategory, imageURL } = itemData

    if(!itemName) return { isAccepted: false, message: 'item name is required' }

    if(!itemDescription) return { isAccepted: false, message: 'item description' }

    if(!itemCategory) return { isAccepted: false, message: 'item category is required' }

    if(!validator.isUsernameValid(itemCategory)) return { isAccepted: false, message: 'invalid item category' }

    if(!imageURL) return { isAccepted: false, message: 'item image URL is required' }
    

    return { isAccepted: true, message: 'valid data', data: itemData }

}

module.exports = { item }