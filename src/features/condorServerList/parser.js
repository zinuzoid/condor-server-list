import jq from 'jquery'

function parseTable(parseHTML, idx) {
    return jq('tr[id^=table_6_row]', parseHTML).map((_, dom) => dom.children[idx].textContent).toArray()
}

export function parseListHtml(html) {
    const parseHTML = jq.parseHTML(html);

    const name = parseTable(parseHTML, 2)
    const serverStatus = parseTable(parseHTML, 4)
    const landscape = parseTable(parseHTML, 5)
    const length = parseTable(parseHTML, 6)
    const playerNum = parseTable(parseHTML, 7)
    const isPrivate = parseTable(parseHTML, 11)

    const result = []
    for (let i = 0; i < name.length; i++) {
        result.push({
            name: name[i],
            landscape: landscape[i],
            serverStatus: serverStatus[i],
            length: length[i],
            playerNum: playerNum[i],
            isPrivate: isPrivate[i],
        })
    }
    return result
}