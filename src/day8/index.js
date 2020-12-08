const { loadData, writeData } = require('../util/data-provider');

function CodeBase(code) {
    this.pc = 0;
    this.acc = 0;
    this.instructions = code.map(line => { const [operation, argument] = line.split(' '); return { operation, argument } });
    this.executedLines = new Set();

    this.execute = () => {
        while(!this.shouldAbort()) {
            const { operation, argument } = this.instructions[this.pc];
            this.executedLines.add(this.pc);
            switch (operation) {
                case 'acc':
                    this.acc += +argument;
                    this.pc++;
                    break;
                case 'jmp':
                    this.pc += +argument;
                    break;
                case 'nop':
                    this.pc++;
                    break;
            }
        }
        if(this.pc >= this.instructions.length) {
            console.log("The program terminated normally.");
            return 0;
        } else {
            console.log("The program terminated due to a infinity loop.");
            return 1;
        }
    }
    this.shouldAbort = () => {
        return this.executedLines.has(this.pc) || this.pc >= this.instructions.length;
    }
    this.reset = () => {
        this.pc = 0;
        this.acc = 0;
        this.executedLines.clear();
    }
}

function modifyCode(lastModifiedInstruction, instructions) {
    for(let i = lastModifiedInstruction + 1; i < instructions.length; i++) {
        const instruction = instructions[i];
        if(instruction.operation === 'jmp') {
            instructions[i].operation = 'nop';
            return i;
        }
        if(instruction.operation === 'nop') {
            instructions[i].operation = 'jmp';
            return i;
        }
    }
    return -1;
}

function deepCopy(array) {
    return JSON.parse(JSON.stringify(array));
}

function execute(level) {
    const code = new CodeBase(loadData(8, level));
    if(level === 1) {
        code.execute();
        writeData(8, level, code.acc);
    } else if(level === 2) {
        const instructionsCopy = deepCopy(code.instructions);
        let lastModified = -1;
        do {
            lastModified = modifyCode(lastModified, code.instructions);
            code.reset();
            if(code.execute() === 0) {
                break;
            }
            code.instructions = deepCopy(instructionsCopy);
        } while(lastModified !== -1);
        writeData(8, level, code.acc);
    }
}

exports.day = execute;