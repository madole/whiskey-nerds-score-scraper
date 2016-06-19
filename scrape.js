const fs = require('fs');

const casper = require('casper').create();

const scoreTable = [];


function clicked() {
    this.echo('Current Page:' + this.getTitle());
    if(this.exists('.score-table')) {
        const table = this.getHTML('.score-table')
        scoreTable.push({
            name: this.getTitle(),
            tableHtml: table,
            url: this.getCurrentUrl()
        });
    }
}

casper.start().then(function() {
    this.open('http://whiskeynerds.com');
});

casper.then(function start() {
    this.echo('First Page:' + this.getTitle());
    this.click('.card a');
    casper.then(clicked.bind(casper));
});

casper.repeat(50, function() {
    if(this.exists('a.next-post')) {
        this.click('.next-post')
        casper.then(clicked.bind(casper))
    }
});

casper.then(function() {
    fs.write('./data.json', JSON.stringify(scoreTable));
});

casper.run();
