const request = require('request')
const fs = require('fs')
const path = require('path')
const appConfig = require('./appConfig.js')

function getAddonPage(categoryUrl = undefined, page = 1) {
    return new Promise((resolve, reject) => {
        let url = appConfig.urls.home
        if (categoryUrl) url = appConfig.urls.base + categoryUrl
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
