const { loadData, writeData } = require('../util/data-provider');

function execute(level) {
    const inputData = loadData(1, level).map(d => parseInt(d, 10));

    // Maybe not the cleanest or prettiest solution but who cares 😂
    if(level == 1) {
        for(let i = 0; i < inputData.length; i++) {
            for(let j = i + 1; j < inputData.length; j++) {
                const sum = inputData[i] + inputData[j];
                if(sum === 2020) {
                    writeData(1, level, inputData[i] * inputData[j]);
                    return;
                }
            }
        }
    } else if(level === 2) {
        for(let i = 0; i < inputData.length; i++) {
            for(let j = i + 1; j < inputData.length; j++) {
                for(let k = j + 1; k < inputData.length; k++) {
                    const sum = inputData[i] + inputData[j] + inputData[k];
                    if(sum === 2020) {
                        writeData(1, level, inputData[i] * inputData[j] * inputData[k]);
                        return;
                    }
                }
            }
        }
    }
}

exports.day1 = {
    execute
};