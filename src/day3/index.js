const { loadData, writeData } = require('../util/data-provider');
const { range, zip } = require('iter-tools');

function parseMap(input) {
    const ySize = input.length;
    const map = input.map(line => line.match(/./g));
    const xSize = map[0].length;
    return {
        map,
        xSize,
        ySize,
        isTree: (x, y) => {
            return map[y % ySize][x % xSize] === '#';
        }
    }
}

function execute(level) {
    const map = parseMap(loadData(3, level));
    if(level === 1) {
        const y = range({ start: 0, end: map.ySize});
        const x = range({ start: 0, step: 3});
        writeData(3, level, [...zip(x, y)].filter(pos => map.isTree(pos[0], pos[1])).length);
    } else if(level === 2) {
        writeData(3, level, 
            [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]].map(pair => {
                const [xStep, yStep] = pair;
                const x = range({ start: 0, step: xStep});
                const y = range({ start: 0, step: yStep, end: map.ySize });
                return [...zip(x, y)].filter(pos => map.isTree(pos[0], pos[1])).length
            }).reduce((prevValue, value) => prevValue * value)
        );
    }
}

exports.day3 = execute;