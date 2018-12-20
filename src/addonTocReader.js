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
        if (lines[i][0] == '#' && lines[i][1] == '#') {
            let propertyName = lines[i].split(':')[0].slice(3)
            let propertyValue = ''
            let _line = lines[i].split(':')
            for (let j = 1; j < _line.length; j ++) {
                if (parseInt(j) > 1) propertyValue += ':'
                propertyValue += _line[j]
            }
            if (!propertyValue) {
                toc.otherProperties.push(lines[i])
                continue
            }
            if (propertyValue[0] == ' ') propertyValue = propertyValue.slice(1)
            toc[propertyName.toLowerCase()] = titleTrimmer(propertyValue)
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

function titleTrimmer(title) {
    //I should really learn Reg now
    let _title = ''
    for (let i = 0; i < title.length; i ++) {
        if (title[i] != '|') {
            _title += title[i]
        } else {
            if (title[i + 1] == 'c') {
                i += 9
                continue
            }
            if (title[i + 1] == 'r') {
                i += 1
                continue
            }
        }
    }
    return _title
}

module.exports = addonTocReader