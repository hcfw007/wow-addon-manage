const request = require('request')
const fs = require('fs')
const path = require('path')
const config = require('./config.js')

function getAddonPage(category = undefined, categoryUrl = undefined, page = 1) {
    return new Promise((resolve, reject) => {
        let url = config.urls.home
        if (category) url = config.urls.base + categoryUrl
        if (page > 1) url += `?page=${page}`
        request(url, (err, res) => {
            if (err) {
                return reject(console.error(err))
            }
            let bodyString = res.body.toString()
            resolve(bodyString)
        })
    })
}

module.exports = getAddonPage
