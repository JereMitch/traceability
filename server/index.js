const express = require('express')
const path = require('path')
const app = express()

app.use(express.json())

const Rollbar = require('rollbar')
const rollbar = new Rollbar({
    accessToken: 'ffe70e0ef1564c6b996867b5f7fdba18',
    captureUncaught: true,
    captureUnhandledRejections: true
})

app.use(express.static("client"))

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './client/index.html'))
    rollbar.info('Success')
})

const port = process.env.PORT || 6969

app.use(rollbar.errorHandler())

app.listen(port, () => console.log(`Hey you, you're finally awake at port ${port}`))