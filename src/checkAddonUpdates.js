const request = require('request')
const appConfig = require('./appConfig.js')
const cheerio = require('cheerio')

request.get(appConfig.urls.home + '/bug-grabber', (err, res) => {
    if (err) {
        console.log(err)
        return
    }
    console.log(res.body.toString())
})