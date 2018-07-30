const fs = require('fs')
const config = require('./config.json')

const addonPath = config.wowPath + '/Interface/Addons/'

fs.readdir(addonPath, (err, files) => {
    console.log(files)
})