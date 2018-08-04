const fs = require('fs')
const config = require('./config.json')
const appConfig = require('./appConfig')
const addonTocReader = require('./addonTocReader')

const addonPath = config.wowPath + '/Interface/Addons/'

fs.readdir(addonPath, (err, files) => {
    addonObjects = []
    files.forEach(file => {
        try {
            let data = fs.readFileSync(addonPath + file + '/' + file + '.toc')
            addonObjects.push(addonTocReader(data.toString()))
        } catch(err) {
            //console.log(err)
        }
    })
    for (let i in addonObjects) {
        if (addonFilter(addonObjects[i])) {
            console.log(addonFilter(addonObjects[i]))
        }
    }
})

function addonFilter(addon) {
    let _title = addon.title.toLowerCase()
    for (let i in appConfig.addons.titleIgnoreList) {
        if (_title.indexOf(appConfig.addons.titleIgnoreList[i]) > -1) {
            return false
        }
    }
    if (_title.indexOf('core') > -1) return _title.slice(0, _title.indexOf('core') - 1)
    return _title
}