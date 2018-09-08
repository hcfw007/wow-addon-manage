const fs = require('fs')
const configPath = './config.json'

const configControl = {
    getConfig: function () {
        if (fs.existsSync(configPath)) {
            return JSON.parse(fs.readFileSync(configPath).toString())
        } else {
            return {}
        }
    },
    setConfig: function (config) {
        let configStr = JSON.stringify(config)
        fs.writeFileSync(configPath, configStr)
    },
}

module.exports = configControl