const express = require('express')
const { appendFile } = require('fs')
const path = require('path')
const app = express()

app.use(express.json())

const Rollbar = require('rollbar')
const rollbar = new Rollbar({
    accessToken: '',
    captureUncaught: true,
    captureUnhandledRejections: true
})

app.use(express.static("client"))

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './client/index.html'))
    rollbar.info('')
})

const port = process.env.PORT || 6969

app.use(rollbar.errorHandler())

app.listen(port, () => console.log(`Hey you, you're finally awake at port ${port}`))