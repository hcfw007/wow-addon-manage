const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')
const Curseforge = require('./src/config.js')

function getAddonHomePage () {
    return new Promise((resolve, reject) => {
        fs.stat(path.resolve(__dirname, './temp/addonHomePage.html'), (err, stats) => {
            if (err || !stats.isFile() || (new Date() - stats.mtime > 86400000)) {
                request(Curseforge.url.home, (err, res) => {
                    if (err) {
                        return reject(console.error(err))
                    }
                    let bodyString = res.body.toString()
                    fs.writeFile(path.resolve(__dirname, './temp/addonHomePage.html'), bodyString, (err) => {
                        if (err) {
                            return reject(console.error(err))
                        }
                        console.log('Addon homepage updated')
                    })
                    return resolve(bodyString)
                })
            } else {
                fs.open(path.resolve(__dirname, './temp/addonHomePage.html'), 'r', (err, fd) => {
                    if (err) {
                        return reject(console.error(err))
                    }
                    let buffer = new Buffer.alloc(2 ** 22)
                    fs.read(fd, buffer, 0, buffer.length, 0, (err, bytes) => {
                        if (err) {
                            return reject(console.error(err))
                        }
                        console.log('Read cached file successfully')
                        fs.close(fd, () => {
                            console.log('file closed')
                            return resolve(buffer.slice(0, bytes).toString())
                        })
                    })
                })
            }
        })
    })
}

async function getPageAddonList(page) {
    let list = []
    await page.then(val => {
        let $page = cheerio.load(val)
        let addonList = $page('li.project-list-item').find('img.aspect__fill')
        addonList.each((index, item) => {
            list.push(item.attribs.alt)
        })
    })
    return list
}

async function getAddonCatagories(homepage) {
    let list = []
    await homepage.then(val => {
        let $homepage = cheerio.load(val)
        let addonCatagories = $homepage('li.tier-holder>ul.categories-tier.indent-0>li.category__item.pd-x-1')
        addonCatagories.each((index, item) => {
            let category = {}
            let $item = $homepage(item)
            category.title = $item.find('p.category__title').text()
            category.url = $item.find('a').attr('href')
            let subs = []
            if ($item.next() && $item.next().attr('class').indexOf('tier-holder') > -1) {
                $subList = $item.next()
                $subList.children().each((index, item) => {
                    let subCategory = {}
                    $subItem = $homepage(item)
                    subCategory.title = $subItem.find('p.category__title').text()
                    subCategory.url = $subItem.find('a').attr('href')
                    subs.push(subCategory)
                })
            }
            console.log(subs)
            if (subs) category.subCategories = subs
            list.push(category)
        })
    })
    return list
}

getAddonCatagories(getAddonHomePage()).then(val => {
    console.log(val)
})

