const Zip = require('adm-zip')
const fs = require('fs')
const cacheControl = require('./cacheControl.js')

function unzip(file, addonPath) {
    let zipObj = new Zip(file)
    let folderList = []

    let cacheObj = cacheControl.getCache()

    zipObj.getEntries().forEach(function(entry) {
        let entryName = entry.entryName
        let folderName = entryName.split('/')[0]
        if (folderList.indexOf(folderName) == -1) {
            folderList.push(folderName)
        }
    })
    for (let i in folderList) {
        cacheObj[folderList[i]] = file.slice(0, -4).split('/').pop()
    }
    cacheControl.setCache(cacheObj)
    
    zipObj.extractAllToAsync(addonPath, true)
}

module.exports = unzip