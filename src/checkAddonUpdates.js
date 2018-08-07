const request = require('request')
const appConfig = require('./appConfig.js')
const cheerio = require('cheerio')
const matchAddon = require('./matchAddonCursePage.js')
const getLocalAddonList = require('./getLocalAddonList.js')

getLocalAddonList().then(addonObjects => {
    addonObjects.forEach(addon => {
        matchAddon(addon.title).then(addonPage => {
            $download = cheerio.load(addonPage)
            let fileList = $download('table.listing.listing-project-file.project-file-listing.b-table.b-table-a')
            let latestVersion = $download('table.listing.listing-project-file.project-file-listing.b-table.b-table-a').find('tbody tr:first-child').find('td.project-file__name').attr('title')
            let downloadURL = $download('table.listing.listing-project-file.project-file-listing.b-table.b-table-a').find('tbody tr:first-child').find('a.button.button--download.download-button.mg-r-05').attr('href')
            if (latestVersion && downloadURL) {
                console.log(addon.title + 'v' + latestVersion + ': ' + downloadURL)
            } else {
                console.log('cannot find page for ' + addon.title)
            }
        })
    })
})