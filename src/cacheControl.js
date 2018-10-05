const fs = require('fs')
const path = require('path')
const cachePath = './cache/'
const cacheFile = 'addonFolderList.json'

const cacheControl = {
    getCache: function () {
        if (fs.existsSync(cachePath + cacheFile)) {
            return JSON.parse(fs.readFileSync(cachePath + cacheFile).toString())
        } else {
            return {}
        }
    },
    setCache: function (cache) {
        if (!fs.existsSync(path.resolve(cachePath))) {
            fs.mkdirSync(path.resolve(cachePath))
        }
        let cacheStr = JSON.stringify(cache)
        fs.writeFileSync(cachePath + cacheFile, cacheStr)
    },
}

module.exports = cacheControl