const { loadData, writeData } = require('../util/data-provider');

function formatRule(rule) {
    let [input, output] = rule.split(' contain ');
    input = input.replace(' bags', '');
    output = output.split(',').map(out => out.trim()).map(out => {
        const count = out.match(/[0-9]+/g);
        return {
            count: count ? count[0] : undefined,
            bag: out.replace(`${count} `, '').replace(' bags', '').replace(' bag', '').replace(/\./g, '')
        }
    })
    return {
        input, output
    };
}

function distinctAdd(array, elements) {
    elements.forEach(element => { if(!array.includes(element)) array.push(element) })
}

function calculateBags(rules, current) {
    let value = 0;
    for(let out of current.output) {
        if(out.count !== undefined) {
            value += +out.count + (out.count * calculateBags(rules, rules.find(rule => rule.input === out.bag)));
        }
    }
    return value;
}

function execute(level) {
    const rules = loadData(7, level).map(rule => formatRule(rule));
    
    if(level === 1) {
        const lookingFor = [{ input: 'shiny gold' }];
        const foundBags = [];
        while(lookingFor.length > 0) {
            const current = lookingFor.shift();
            distinctAdd(lookingFor, rules.filter(rule => rule.output.find(output => output.bag === current.input)))
            distinctAdd(foundBags, lookingFor);
        }
        writeData(7, level, foundBags.length);
    } else if(level === 2) {
        const startBag = rules.find(rule => rule.input === 'shiny gold');
        writeData(7, level, calculateBags(rules, startBag));
    }
}

exports.day = execute;