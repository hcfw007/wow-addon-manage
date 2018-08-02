const fs = require('fs')
const config = require('./config.json')
const addonTocReader = require('./addonTocReader')

const addonPath = config.wowPath + '/Interface/Addons/'

fs.readdir(addonPath, (err, files) => {
    addonObject = []
    files.forEach(file => {
        try {
            let data = fs.readFileSync(addonPath + file + '/' + file + '.toc')
            addonObject.push(addonTocReader(data.toString()).title)
        } catch(err) {
            //console.log(err)
        }
    })
    console.log(addonObject)
})