const request = require('request')
const appConfig = require('./appConfig.js')
const cheerio = require('cheerio')
const matchAddon = require('./matchAddonCursePage.js')
const getLocalAddonList = require('./getLocalAddonList.js')


function checkAddonUpdates() {
    return new Promise((resolve, reject) => {
        let addonUpdateInfoList = []
        let matchPromiseList = []
        getLocalAddonList().then(addonObjects => {
            addonObjects.forEach(addon => {
                let matchPromise = matchAddon(addon.title).then(addonPage => {
                    if (addonPage == "no match") {
                        return
                    }
                    $download = cheerio.load(addonPage)
                    let fileList = $download('table.listing.listing-project-file.project-file-listing.b-table.b-table-a')
                    let latestVersion = $download('table.listing.listing-project-file.project-file-listing.b-table.b-table-a').find('tbody tr:first-child').find('td.project-file__name').attr('title')
                    let downloadURL = $download('table.listing.listing-project-file.project-file-listing.b-table.b-table-a').find('tbody tr:first-child').find('a.button.button--download.download-button.mg-r-05').attr('href')
                    let gameVersion = $download('table.listing.listing-project-file.project-file-listing.b-table.b-table-a').find('tbody tr:first-child').find('span.table__content.version__label').text()
                    let uploadTimeStamp = $download('table.listing.listing-project-file.project-file-listing.b-table.b-table-a').find('tbody tr:first-child').find('abbr.tip.stardard-date.standard-datetime').attr('data-epoch')
                    if (latestVersion && downloadURL) {
                        //console.log(addon.title + 'v' + latestVersion + ': ' + downloadURL)
                        let addonUpdateInfo = {}
                        addonUpdateInfo.latestVersion = latestVersion
                        addonUpdateInfo.gameVersion = gameVersion
                        addonUpdateInfo.uploadTimeStamp = parseInt(uploadTimeStamp) * 1000
                        addonUpdateInfo.downloadURL = downloadURL
                        addonUpdateInfoList.push(addonUpdateInfo)
                    } else {
                        //console.log('cannot find page for ' + addon.title)
                    }
                    
                })
                matchPromiseList.push(matchPromise)
            })
            Promise.all(matchPromiseList).then(res => {
                console.log('success')
                resolve(addonUpdateInfoList)
            }).catch(err => {
                console.log('err')
            })
        })
    })
}

checkAddonUpdates()then(val => {
    console.log(val)
}).catch(err => {
    console.log(err)
})