
const isAuctionHallNameValid = (auctionHallName) => {

    const invalidChars = `~!@#$%^&*()_-=+|][{};:<>/`

    for(let i=0;i<invalidChars.length;i++) {

        for(let j=0;j<auctionHallName.length;j++) {

            if(invalidChars[i] == auctionHallName[j]) {
                return false
            }
        }
    }

    return true

}

module.exports = { isAuctionHallNameValid }