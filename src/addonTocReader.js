function addonTocReader(addonStr) {
    let index = 0
    let lines = []
    let toc = {}
    toc.otherProperties = []
    while (index < addonStr.length) {
        let lineinfo = readline(addonStr, index)
        index += lineinfo.length
        lines.push(lineinfo.line)
    }
    for (let i in lines) {
        if (lines[i].length <= 1) continue
        if (lines[i][0] == "#" && lines[i][1] == "#") {
            let propertyName = lines[i].split(':')[0].slice(3)
            let propertyValue = lines[i].split(':')[1]
            if (!propertyValue) {
                toc.otherProperties.push(lines[i])
                continue
            }
            if (propertyValue[0] == " ") propertyValue = propertyValue.slice(1)
            toc[propertyName.toLowerCase()] = propertyValue
        } else {
            
        }
    }
    return toc
}

function readline(str, index) {
    let line = ''
    let lineLength = 0
    while(str[index + lineLength] != '\n' && (index + lineLength) < str.length) {
        if (str[index + lineLength] != '\r') line += str[index + lineLength]
        lineLength ++
    }
    lineLength ++
    return {
        length: lineLength,
        line: line,
    }
}



module.exports = addonTocReader