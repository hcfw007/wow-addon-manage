const Zip = require("adm-zip")
const config = require('./config.json')
const addonPath = config.wowPath + '/Interface/Addons/'

function unzip(file, target) {
    let zipObj = new Zip(file)
    zipObj.extractAllToAsync(addonPath, true)
}

module.exports = unzip