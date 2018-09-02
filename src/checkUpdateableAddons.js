const request = require('request')
const appConfig = require('./appConfig.js')
const cheerio = require('cheerio')
const matchAddon = require('./matchAddonCursePage.js')
const getLocalAddonList = require('./getLocalAddonList.js')


function checkUpdateableAddons() {
    return new Promise((resolve, reject) => {
        let updateableAddonInfoList = []
        let matchPromiseList = []
        let matchedList = []
        getLocalAddonList().then(addonObjects => {
            addonObjects.forEach(addon => {
                let matchPromise = matchAddon(addon.title, matchedList).then(addonPage => {
                    if (addonPage == "no match") {
                        return
                    }
                    $download = cheerio.load(addonPage)
                    let name = $download('div.project-header__details>h2.name').text()
                    let fileList = $download('table.listing.listing-project-file.project-file-listing.b-table.b-table-a')
                    let latestVersion = $download('table.listing.listing-project-file.project-file-listing.b-table.b-table-a').find('tbody tr:first-child').find('td.project-file__name').attr('title')
                    let downloadURL = $download('table.listing.listing-project-file.project-file-listing.b-table.b-table-a').find('tbody tr:first-child').find('a.button.button--download.download-button.mg-r-05').attr('href')
                    let gameVersion = $download('table.listing.listing-project-file.project-file-listing.b-table.b-table-a').find('tbody tr:first-child').find('span.table__content.version__label').text()
                    let uploadTimeStamp = parseInt($download('table.listing.listing-project-file.project-file-listing.b-table.b-table-a').find('tbody tr:first-child').find('abbr.tip.standard-date.standard-datetime').attr('data-epoch'))
                    if (latestVersion && downloadURL) {
                        //console.log(addon.title + 'v' + latestVersion + ': ' + downloadURL)
                        let updateableAddonInfo = {}
                        updateableAddonInfo.name = name
                        updateableAddonInfo.latestVersion = latestVersion
                        updateableAddonInfo.gameVersion = gameVersion
                        updateableAddonInfo.uploadTimeStamp = parseInt(uploadTimeStamp) * 1000
                        updateableAddonInfo.downloadURL = downloadURL
                        updateableAddonInfo.currentVersion = addon.version
                        updateableAddonInfo.currentTimeStamp = addon.currentTimeStamp
                        updateableAddonInfoList.push(updateableAddonInfo)
                    } else {
                        //console.log('cannot find page for ' + addon.title)
                    }
                    
                })
                matchPromiseList.push(matchPromise)
            })
            console.log(matchedList)
            Promise.all(matchPromiseList).then(res => {
                resolve(updateableAddonInfoList)
            }).catch(err => {
                console.log(err)
            })
        })
    })
}

module.exports = checkUpdateableAddons