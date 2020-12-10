const { loadData, writeData } = require('../util/data-provider');


function execute(level) {
    const data = loadData(10, level)
        .map(s => +s)
        .sort((a, b) => a - b);

    if(level === 1) {
        const solution = data.reduce((prev, cur) => {
                const diff = cur - prev.prev;
                if(diff === 1) {
                    prev.ones++;
                } else if(diff === 3) {
                    prev.threes++;
                }
                prev.prev = cur;
                return prev;
            }, { ones: 0, threes: 0, prev: 0 });
        writeData(10, level, solution.ones * (solution.threes + 1));
    } else if(level === 2) {
        
    }
}

exports.day = execute;