function addonTocReader(addonStr) {
    let index = 0
    while (index < addonStr.length) {
        index += readline(addonStr, index)
    }
    return "done"
}

function readline(str, index) {
    let line = ''
    while(str[index] != '\n') {
        line += str[index]
        index ++
    }
    console.log(line)
    return index
}



module.exports = addonTocReader