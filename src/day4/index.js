const { loadData, writeData } = require('../util/data-provider');
const Joi = require('joi');

const level1PassportSchema = Joi.object({
    byr: Joi.required(),
    iyr: Joi.required(),
    eyr: Joi.required(),
    hgt: Joi.required(),
    hcl: Joi.required(),
    ecl: Joi.required(),
    pid: Joi.required(),
    cid: Joi.optional()
});

const level2PassportSchema = Joi.object({
    byr: Joi.number().integer().min(1920).max(2002).required(),
    iyr: Joi.number().integer().min(2010).max(2020).required(),
    eyr: Joi.number().integer().min(2020).max(2030).required(),
    hgt: Joi.string().pattern(/^(1(([5-8][0-9])|9[0-3])cm)|((59|6[0-9]|7[0-6])in)$/).required(),
    hcl: Joi.string().pattern(/^#[a-f0-9]{6}$/).required(),
    ecl: Joi.string().valid("amb", "blu", "brn", "gry", "grn", "hzl", "oth").required(),
    pid: Joi.string().pattern(/^[0-9]{9}$/).required(),
    cid: Joi.number().integer().optional()
});

function parsePassport(data) {
    const passports = [];
    let currentPassport = { };
    for(let pair of data) {
        if(pair === '') {
            passports.push(currentPassport);
            currentPassport = { };
        } else {
            const [property, value] = pair.split(':');
            currentPassport[property] = value;
        }
    }
    passports.push(currentPassport);
    return passports;
}

function execute(level) {
    const passports = parsePassport(loadData(4, level).join(' ').split(' '));
    if(level === 1) {
        writeData(4, 1, passports.filter(passport => !level1PassportSchema.validate(passport).error).length);
    } else if(level === 2) {
        writeData(4, 2, passports.filter(passport => !level2PassportSchema.validate(passport).error).length);
    }
}

exports.day4 = execute;