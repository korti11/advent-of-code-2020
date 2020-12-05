const { loadData, writeData } = require('../util/data-provider');
const { range } = require('iter-tools');

function execute(level) {
    const seatIDs = loadData(5, level)
        .map(line => { return { row: line.substr(0, 7), column: line.substr(7) } })
        .map(pair => {
            return {
                row: (pair.row.match(/./g).reduce((prev, cur, index) => cur === 'F' ? prev - (128 / Math.pow(2, index + 1)) : prev + (128 / Math.pow(2, index + 1)), 128) - 1) / 2,
                column: (pair.column.match(/./g).reduce((prev, cur, index) => cur === 'L' ? prev - (8 / Math.pow(2, index + 1)) : prev + (8 / Math.pow(2, index + 1)), 8) - 1) / 2
            }
        }).map(pair => pair.row * 8 + pair.column);

    if(level === 1) {
        writeData(5, level, JSON.stringify(Math.max(...seatIDs)));
    } else if(level === 2) {
        const sortedIDs = seatIDs.sort((a, b) => a - b);
        for(let value of range({ start: sortedIDs[0], stop: sortedIDs[sortedIDs.length - 1]})) {
            if(!sortedIDs.includes(value)) {
                writeData(5, level, JSON.stringify(value));
                return;
            }
        }
    }
}

exports.day5 = execute;