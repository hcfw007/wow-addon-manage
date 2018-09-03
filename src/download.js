const fs = require('fs')
const path = require('path')
const request = require('request')
const appConfig = require('./appConfig.js')


function download(url, filename = 'temp.zip') {
    return new Promise((resolve, reject) => {
        let file = path.resolve('./temp/' + filename)
        let writeStream = fs.createWriteStream(file)
        console.log(appConfig.urls.base + url + '/file')
        request.get({url: appConfig.urls.base + url + '/file',}).pipe(writeStream) //It somehow works in a better network environment
        writeStream.on('finish', function() {
            resolve("success")
        })
        writeStream.on('error', function(err) {
            console.log(err)
            reject("error")
        })
        setTimeout(() => {
            reject("time out")
        }, 10000)
    })
    
}

module.exports = download