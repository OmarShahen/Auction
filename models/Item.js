const mongoose = require('mongoose')

const Schema = mongoose.Schema

const itemSchema = new Schema({

    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    imageURL: { type: String, required: true }    

}, { timestamps: true })

itemSchema.index({ name: 'text', category: 'text' })

module.exports = itemSchema