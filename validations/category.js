
const category = (categoryData) => {

    const { name } = categoryData

    if(!name) return { isAccepted: false, message: 'category name is required' }

    return { isAccepted: true, message: 'valid data', data: categoryData }
}

module.exports = { category }