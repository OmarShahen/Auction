const express = require('express')
const logger = require('morgan')
const config = require('./config/config')
const database = require('./config/database')


const app = express()


app.use(logger('dev'))
app.use(express.json())

app.use('/api/v1/auth', require('./routes/auth'))
app.use('/api/v1', require('./routes/auctions'))
app.use('/api/v1', require('./routes/categories'))

database()

app.listen(config.PORT,() => console.log(`App started on port ${config.PORT}`))