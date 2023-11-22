import _ from 'lodash'

export function csvParse(data: string): object[] {
    const lines = data.split(/\n/)

    const seperater = _.split(lines[0], '=')[1]

    const header = _.split(lines[1], seperater)

    return _.map(_.slice(lines, 3), line => {

        const lineDatas = _.split(line, seperater)

        return _.reduce(lineDatas, function (result, value, lineIndex) {
            const patternToRemove1 = /^\"/g; // 先頭のダブルクォート
            const patternToRemove2 = /\"$/g; // 末尾のダブルクォート
            const resultString = value.replace(patternToRemove1, '').replace(patternToRemove2, '')
            result[header[lineIndex]] = resultString
            return result
        }, {} as {[key in string]: string}); 

    })
}