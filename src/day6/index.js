const { loadData, writeData } = require('../util/data-provider');
const intersect = require('intersect');

function execute(level) {
    const data = loadData(6, level)
        .reduce((prev, cur) => prev + (cur === '' ? ' ' : (cur + ';')))
        .split(' ');
        
    if(level === 1) {
        writeData(6, level, data
            .map(group => group.replace(/;/g, ''))
            .map(group => group.match(/./g))
            .map(group => group.filter((value, index, self) => self.indexOf(value) === index))
            .reduce((prev, cur) => prev + cur.length, 0)
        );
    } else if(level === 2) {
        writeData(6, level, data
            .map(group => group.split(';').filter(value => value !== ''))
            .map(group => group.map(value => value.match(/./g)))
            .map(group => intersect(group))
            .reduce((prev, cur) => prev + cur.length, 0)
        );
    }
    
}

exports.day = execute;