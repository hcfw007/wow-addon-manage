const fs = require('fs')
const download = require('download')
const path = require('path')

const url = 'https://www.curseforge.com/wow/addons/weakauras-2/download/2595192/file'
const url2 = 'https://media.forgecdn.net/files/2597/855/Bagnon_8.0.2.zip'



const request = require('request')

function downloadAndFollowRedirect(url) {
    request.get({
        url: url,
        followRedirect: false,
    }, (err, res) => {
        if (res.statusCode < 300) {
            console.log('trying to download ' + url)
            download(url , path.resolve('../temp/')).then(() => {
                console.log('download success')
            }).catch(err => {
                console.log(err)
            })
        } else {
            if (res.headers.location) {
                console.log('redirecting to ' + res.headers.location)
                downloadAndFollowRedirect(res.headers.location)
            }
        }
    })
}

request.get({
    url: url2,
    headers: {
        'Connection': 'keep-alive',
        'Accept': '*/*',
    },
}, (err, res) => {
    console.log(err, res)
}).pipe(fs.createWriteStream(path.resolve('./temp/download.zip')))
// downloadAndFollowRedirect(url)

// download(url2 , path.resolve('../temp/')).then(() => {
//     console.log('download success')
// }).catch(err => {
//     console.log(err)
// })