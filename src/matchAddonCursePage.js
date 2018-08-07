const request = require('request')
const cheerio = require('cheerio')
const appConfig = require('./appConfig.js')

function matchAddon(title) {
    return new Promise((resolve, reject) => {
        title_hyphen = title.replace(/ /g, '-')
        request.get(appConfig.urls.home + '/' + title_hyphen + '/files', (err, res) => {
            if (err) {
                //console.log(err)
                return
            }
            let $page = cheerio.load(res.body.toString())
            if ($page('header.h2.no-sub.no-nav>h2').text() == 'Not found') {
                //console.log('hyphen no match')
                return
            }
            //console.log('hyphen found')
            resolve(res.body.toString())
            return
        })
        title_init = title.split(' ')[0]
        if (title_init != title_hyphen) {
            request.get(appConfig.urls.home + '/' + title_init + '/files', (err, res) => {
                if (err) {
                    //console.log(err)
                    return
                }
                let $page = cheerio.load(res.body.toString())
                if ($page('header.h2.no-sub.no-nav>h2').text() == 'Not found') {
                    //console.log('init no match')
                    return
                }
                //console.log('init found')
                resolve(res.body.toString())
                return
            })
        }
        //reject("cannot find any addon match " + title + " on CurseForge")
    })
}

module.exports = matchAddon