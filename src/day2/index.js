const { loadData, writeData } = require('../util/data-provider');

function execute(level) {
    const data = loadData(2, level)
    .map(line => { const [ policy, password ] = line.split(':'); return { policy, password }})
    .map(pair => { const [ range, char ] = pair.policy.split(' '); return { policy: { range, char }, password: pair.password.trim() } })
    .map(pair => { const [ min, max ] = pair.policy.range.split('-'); return { policy: { range: { min, max }, char: pair.policy.char }, password: pair.password } });

    if(level === 1) {
        writeData(2, 1, (
            data.map(pair => { return { range: pair.policy.range, count: (pair.password.match(new RegExp(pair.policy.char, 'g')) || []).length } })
            .filter(pair => pair.range.min <= pair.count && pair.count <= pair.range.max) || []
            ).length);
    } else if(level === 2) {
        writeData(2, 2, (data.filter(pair => (
            (pair.password.charAt(pair.policy.range.min - 1) === pair.policy.char || pair.password.charAt(pair.policy.range.max - 1) === pair.policy.char) &&
            pair.password.charAt(pair.policy.range.min - 1) !== pair.password.charAt(pair.policy.range.max - 1)
        )) || []).length);
    }

}

exports.day2 = execute;