const fs = require('fs');

function loadData(day, level) {
    return fs.readFileSync(`data/day${day}-${level}.txt`).toString('utf-8').split('\n');
}

function writeData(day, level, data) {
    fs.writeFileSync(`data/day${day}-${level}-solution.txt`, data, { encoding: 'utf-8' });
}

exports.loadData = loadData;
exports.writeData = writeData;