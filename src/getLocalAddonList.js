const fs = require('fs')
const appConfig = require('./appConfig')
const addonTocReader = require('./addonTocReader')
const cacheControl = require('./cacheControl')

function getLocalAddonList(addonPath) {
    return new Promise((resolve, reject) => {
        fs.readdir(addonPath, (err, files) => {
            if (err) {
                reject(err)
            }
            let _addonObjects = []
            files.forEach(file => {
                try {
                    if (cacheControl.getCache()[file] && files.indexOf(cacheControl.getCache()[file]) != -1 && file != cacheControl.getCache()[file]) {
                        console.log(file, 'ignored due to it\' s a part of', (cacheControl.getCache()[file]))
                        return
                    }
                    let tocFile = addonPath + '/' + file + '/' + file + '.toc'
                    let data = fs.readFileSync(tocFile)
                    let addonObject = addonTocReader(data.toString())
                    addonObject.currentTimeStamp = fs.statSync(tocFile).mtime.getTime()
                    _addonObjects.push(addonObject)
                } catch(err) {
                    //console.log(err)
                }
            })
            let addonObjects = []
            for (let i in _addonObjects) {
                if (addonFilter(_addonObjects[i])) {
                    _addonObjects[i].title = addonFilter(_addonObjects[i])
                    addonObjects.push(_addonObjects[i])
                }
            }
            resolve(addonObjects)
            console.log(addonObjects)
        })
    })
}



function addonFilter(addon) {
    let title = addon.title
    let _title = title.toLowerCase()
    for (let i in appConfig.addons.titleIgnoreList) {
        if (_title.indexOf(appConfig.addons.titleIgnoreList[i]) > -1) {
            return false
        }
    }
    if (_title.indexOf('core') > -1) return title.slice(0, _title.indexOf('core') - 1)
    return title
}

module.exports = getLocalAddonList