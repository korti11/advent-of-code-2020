const { loadData, writeData } = require('../util/data-provider');
const { combinations } = require('iter-tools');

function execute(level) {
    const inputData = loadData(1, level).map(d => parseInt(d, 10));

    if(level === 1) {
        for(let c of combinations(inputData, 2)) { if(c[0] + c[1] === 2020) { writeData(1, level, c[0] * c[1]); return; } }
    } else if(level === 2) {
        for(let c of combinations(inputData, 3)) { if(c[0] + c[1] + c[2] === 2020) { writeData(1, level, c[0] * c[1] * c[2]); return; } }
    }
}

exports.day1 = {
    execute
};