const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bidSchema = new Schema({
    
    bidderId: { type: String, required: true },
    value: { type: Number, required: true }

}, { timestamps: true })

module.exports = bidSchema