const fs = require('fs')
const path = require('path')
const request = require('request')


function download(url) {
    request.get({url: url,}).pipe(fs.createWriteStream(path.resolve('./temp/download.zip'))) //It somehow works in a better network environment
}