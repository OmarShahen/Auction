const express = require('express')
const logger = require('morgan')
const config = require('./config/config')
const database = require('./config/database')
const cors = require('cors')
const http = require('http')
const io = require('socket.io')
const path = require('path')

const bidsEvents = require('./socket-events/bids')


const app = express()
const httpServer = http.Server(app)
const webSocketServer = io(httpServer, { cors: { origin: '*' } })


app.use(logger('dev'))
app.use(express.json())
app.use(cors())

app.use('/api/v1/auth', require('./routes/auth'))
app.use('/api/v1', require('./routes/auctions'))
app.use('/api/v1', require('./routes/categories'))

bidsEvents(webSocketServer)

database()

app.get('/', (request, response) => {

    return response.sendFile(path.join(__dirname + '/test.html'))
})

httpServer.listen(config.PORT,() => console.log(`App started on port ${config.PORT}`))