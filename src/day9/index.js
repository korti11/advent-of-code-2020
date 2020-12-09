const { loadData, writeData } = require('../util/data-provider');

function noPair(subArray, value) {
    return subArray.find(v1 => subArray.find(v2 => { if(v1 === v2) { return false; }  return v1 + v2 === value }));
}

function findRange(subArray, value) {
    for(let i = 0; i < subArray.length; i++) {
        let sum = subArray[i];
        for(let j = i + 1; subArray.length && sum < value; j++) {
            sum += subArray[j];
            if(sum === value) {
                return subArray.slice(i, j + 1).sort((a, b) => a - b);
            }
        }
    }
    return [];
}

function execute(level) {
    const preamble = 25;
    const data = loadData(9, level).map(value => +value);
    const invalid = data.find((value, index, array) => {
        if(index < preamble) {
            return false;
        }
        return noPair(array.slice(index - preamble, index), value) === undefined;
    });
    if(level === 1) {
        writeData(9, level, invalid);
    } else if(level === 2) {
        const invalidIndex = data.indexOf(invalid);
        const range = findRange(data.slice(0, invalidIndex), invalid);
        writeData(9, level, range[0] + range[range.length - 1]);
    }
}

exports.day = execute;