const Zip = require("adm-zip")

function unzip(file, addonPath) {
    let zipObj = new Zip(file)
    zipObj.extractAllToAsync(addonPath, true)
}

module.exports = unzip