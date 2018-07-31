const fs = require('fs')
const config = require('./config.json')
const addonTocReader = require('./addonTocReader')

const addonPath = config.wowPath + '/Interface/Addons/'

fs.readdir(addonPath, (err, files) => {
    fs.readFile(addonPath + files[0] + '/' + files[0] + '.toc', (err, data) => {
        console.log(addonTocReader(data.toString()))
    })
})