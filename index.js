const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')

const getAddonPage = () => {
    return new Promise((resolve, reject) => {
        fs.stat(path.resolve(__dirname, './temp/addonHomePage.html'), (err, stats) => {
            if (err || !stats.isFile() || (new Date() - stats.mtime > 86400000)) {
                request('https://www.curseforge.com/wow/addons', (err, res) => {
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
getAddonPage().then(val => {
    const $homepage = cheerio.load(val)
    let addonList = $homepage('li.project-list-item').find('img.aspect__fill')
    addonList.each((index, item) => {
        console.log(item.attribs.alt)
    })
})