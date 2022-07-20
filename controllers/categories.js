const categoryRequestValidator = require('../validations/category')
const CategoryModel = require('../models/Category')
const utils = require('../utils/utils')


const addcategory = async (request, response) => {

    try {

        const validateCategory = categoryRequestValidator.category(request.body)

        if(!validateCategory.isAccepted) {
            return response.status(406).json({
                success: validateCategory.isAccepted,
                message: validateCategory.message
            })
        }

        const { name } = request.body

        const usedCategoriesList = await CategoryModel.find({ name })

        if(usedCategoriesList.length != 0) {
            return response.status(406).json({
                success: false,
                message: 'category name is already used'
            })
        }

        const newCategoryData = { name } 

        const newCategory = new CategoryModel(newCategoryData)
        let createdCategory = await newCategory.save()

        createdCategory = utils.cleanObject(createdCategory._doc, { updatedAt: '', __v: '' })

        return response.status(200).json({
            success: true,
            message: 'category created successfully',
            category: createdCategory
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


const getCategories = async (request, response) => {

    try {

        const categories = await CategoryModel.find()

        return response.status(200).json({
            success: true,
            categories
        })

    } catch(error) {
        console.error(error)
        return response.status(500).json({
            success: false,
            message: 'internal server error'
        })
    }
}





module.exports = { addcategory, getCategories }