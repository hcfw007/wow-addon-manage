const Zip = require("adm-zip")

function unzip(file, addonPath) {
    let zipObj = new Zip(file)
    let folderList = []
    zipObj.getEntries().forEach(function(entry) {
        let entryName = entry.entryName
        let folderName = entryName.split("/")[0]
        if (folderList.indexOf(folderName) == -1) {
            folderList.push(folderName)
        }
    })
    console.log(folderList)
    zipObj.extractAllToAsync(addonPath, true)
}

module.exports = unzip