const fs = require('fs')
const path = require('path')
const request = require('request')


function download(url, filename = 'temp.zip') {
    return new Promise((resolve, reject) => {
        let file = path.resolve('./temp/' + filename)
        let writeStream = fs.createWriteStream(file)
        request.get({url: url,}).pipe(writeStream) //It somehow works in a better network environment
        writeStream.on('finish', function() {
            resolve("success")
        })
        writeStream.on('error', function(err) {
            console.log(err)
            reject("error")
        })
    })
    
}

module.exports = download