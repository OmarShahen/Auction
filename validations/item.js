const validator = require('../utils/utils')

const item = (itemData) => {

    const { itemName, itemDescription, itemCategory, imageURL } = itemData

    if(!itemName) return { isAccepted: false, message: 'item name is required', field: 'itemName' }

    if(!itemDescription) return { isAccepted: false, message: 'item description', field: 'itemDescription' }

    if(!itemCategory) return { isAccepted: false, message: 'item category is required', field: 'itemCategory' }

    if(!validator.isUsernameValid(itemCategory)) return { isAccepted: false, message: 'invalid item category', field: 'itemCategory' }

    if(!imageURL) return { isAccepted: false, message: 'item image URL is required', field: 'imageURL' }
    

    return { isAccepted: true, message: 'valid data', data: itemData }

}

module.exports = { item }