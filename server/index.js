const express = require('express')
const path = require('path')
const app = express()

app.use(express.json())

const Rollbar = require('rollbar')
const rollbar = new Rollbar({
    accessToken: '534d2045c5104269b03b20180d2ccabf',
    captureUncaught: true,
    captureUnhandledRejections: true,
})

app.use(express.static("client"))

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'))
    rollbar.info('Success')
})

const port = process.env.PORT || 6969

app.use(rollbar.errorHandler())

app.listen(port, () => console.log(`Hey you, you're finally awake at port ${port}`))