const fs = require('fs')
const download = require('download')

const url = 'https://www.curseforge.com/wow/addons/weakauras-2/download/2595192/file'



const request = require('request')
request.get({
    url: url,
    followRedirect: false,
} , (err, res) => {
    let fileAddress = res.headers.location
    fileAddress = fileAddress.replace('addons.cursecdn.com', 'media.forgecdn.net')
    console.log(fileAddress)
    download(fileAddress, '../temp/').then(() => {
        console.log('success')
    })
})

// download('https://addons.cursecdn.com/files/2595/192/WeakAuras-2.6.6.zip', '/user/styx/downloads/').then(() => {
//     console.log('success')
// })