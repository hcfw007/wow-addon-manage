const fs = require('fs')
const config = require('./config.json')
const appConfig = require('./appConfig')
const addonTocReader = require('./addonTocReader')

const addonPath = config.wowPath + '/Interface/Addons/'

function getLocalAddonList() {
    return new Promise((resolve, reject) => {
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
            console.log(addonObjects)
            for (let i in addonObjects) {
                if (addonFilter(addonObjects[i])) {
                    addonObjects[i].title = addonFilter(addonObjects[i])
                }
            }
            resolve(addonObjects)
        })
    })
}



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

module.exports = getLocalAddonList