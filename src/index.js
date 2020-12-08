const currentDay = +process.argv[2] || new Date().getDate();
const { day } = require(`./day${currentDay}`);

day(1);
day(2);