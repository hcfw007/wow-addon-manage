const baseUrl = 'https://www.curseforge.com'
const path = require('path')

const config = {
    urls: {
        base: baseUrl,
        home: baseUrl + '/wow/addons',
    },
    path: {
        base: path.resolve(__dirname, '../'),
    },
    addons: {
        titleIgnoreList: [
            'option',
            'config',
            '<',
            '>',
        ]
    }
}

module.exports = config