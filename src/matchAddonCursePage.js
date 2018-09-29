const request = require('request')
const cheerio = require('cheerio')
const appConfig = require('./appConfig.js')

function matchAddon(title, matchedList, history) {
    return new Promise((resolve, reject) => {
        let origin_title = title
        let no_match = true
        title_upper_seperated = title.replace(/\S[A-Z][a-z]+?/g, function(word) {
            return word[0] + " " + word.slice(1)
        })
        if (title_upper_seperated != title) {
            let title_lower_seperated = title_upper_seperated.toLowerCase()
            tryHyphen(title_lower_seperated)
            tryInit(title_lower_seperated)
            tryAbbr(title_lower_seperated)
        }
        title = title.toLowerCase()
        tryHyphen(title)
        tryInit(title)
        tryAbbr(title)
        
        function tryHyphen(t) {
            let _t = t.replace(/ /g, '-')
            if (checkDuplicate(_t, matchedList)) {
                matchedList.push(_t)
                let tryUrl = appConfig.urls.home + '/' + _t + '/files'
                request.get(tryUrl, (err, res) => {
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
                    no_match = false
                    resolve(res.body.toString())
                    history[origin_title] = tryUrl
                    //return
                })
            }
        }
        function tryInit(t) {
            let _t = t.split(' ')[0]
            if (checkDuplicate(_t, matchedList)) {
                matchedList.push(_t)
                let tryUrl = appConfig.urls.home + '/' + _t + '/files'
                request.get(tryUrl, (err, res) => {
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
                    no_match = false
                    resolve(res.body.toString())
                    history[origin_title] = tryUrl
                    //return
                })
            }
        }
        function tryAbbr(t) {
            let _t = ''
            t.match(/\b[a-zA-z]/g).forEach((letter) => {
                _t += letter
            })
            if (checkDuplicate(_t, matchedList)) {
                matchedList.push(_t)
                let tryUrl = appConfig.urls.home + '/' + _t + '/files'
                request.get(tryUrl, (err, res) => {
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
                    no_match = false
                    resolve(res.body.toString())
                    history[origin_title] = tryUrl
                    //return
                })
            }
        }
        
        setTimeout(() => {
            if (no_match) {
                resolve('no match')
                console.log(title)
            }
        }, 15000)
    })
}

function checkDuplicate(title, matchedList) {
    for (let i in matchedList) {
        if (matchedList[i] == title) {
            return false
        }
    }
    return true
}

module.exports = matchAddon