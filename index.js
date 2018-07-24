const request = require('request')
const cheerio = require('cheerio')

request('https://www.curseforge.com/wow/addons', (err, res) => {
    if (err) {
        console.error(err)
        return
    }
    let $ = cheerio.load(res.body.toString())
    let list = $('li.project-list-item')
    console.log(typeof(list))
})