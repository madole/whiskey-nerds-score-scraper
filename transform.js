const cheerio = require('cheerio');
const fs = require('fs');
const bConsole = require('better-console');

const data = fs.readFileSync('./data.json', {encoding: 'utf-8'});
const arr = JSON.parse(data);
const statsArr = [];
for(var item of arr) {
    const $ = cheerio.load(item.tableHtml);
    const trs = $('tr').length;
    const nose = $('tr:nth-of-type(1) td:nth-of-type(2)').text();
    const taste = $('tr:nth-of-type(2) td:nth-of-type(2)').text();
    const finish = $('tr:nth-of-type(3) td:nth-of-type(2)').text();
    let overall;
    if(trs === 4) {
        overall = $('tr:nth-of-type(4) td:nth-of-type(2)').text();
    } else {
        overall = $('tr:nth-of-type(5) td:nth-of-type(2)').text();
    }

    const stats = {name: item.name, nose, taste, finish, overall};
    statsArr.push(stats);
}

bConsole.table(statsArr);
