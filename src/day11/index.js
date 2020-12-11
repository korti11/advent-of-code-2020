const { loadData, writeData } = require('../util/data-provider');

function SeatMap(input, neededToLeave) {
    this.map = input.map(line => line.match(/./g));
    this.seatAmount = this.map.reduce((prev, cur) => prev + cur.reduce((prev, cur) => prev + (cur === 'L') ? 1 : 0), 0);
    this.availableSeats = this.seatAmount;
    this.isStable = false;

    this.occupiedSeats = function () {
        return this.seatAmount - this.availableSeats;
    }

    this.countAdjacentSeats = function (x, y, mapCopy) {
        return 0;
    }

    this.update = function () {
        const mapCopy = JSON.parse(JSON.stringify(this.map));
        this.isStable = true;
        for(let y = 0; y < mapCopy.length; y++) {
            for(let x = 0; x < mapCopy[y].length; x++) {
                const current = mapCopy[y][x];
                if(current === 'L' && this.countAdjacentSeats(x, y, mapCopy) === 0) {
                    this.map[y][x] = '#';
                    this.availableSeats--;
                    this.isStable = false;
                } else if(current === '#' && this.countAdjacentSeats(x, y, mapCopy) >= neededToLeave) {
                    this.map[y][x] = 'L'
                    this.availableSeats++;
                    this.isStable = false;
                }
            }
        }
    }
}

function execute(level) {
    if(level === 1) {
        const seatMap = new SeatMap(loadData(11, level), 4);

        seatMap.countAdjacentSeats = function (x, y, mapCopy) {
            let count = 0;
            for(let i = y - 1; i <= y + 1; i++) {
                for(let j = x - 1; j <= x + 1; j++){
                    if(i === y && j === x) continue;
                    if(i >= 0 && i < mapCopy.length &&
                        j >= 0 && j < mapCopy[i].length && mapCopy[i][j] === '#') {
                            count++;
                        }
                }
            }
            return count;
        }

        do {
            seatMap.update();
        } while(!seatMap.isStable);
        writeData(11, level, seatMap.occupiedSeats())
    } else if(level === 2) {
        const seatMap = new SeatMap(loadData(11, level), 5);

        seatMap.countAdjacentSeats = function (x, y, mapCopy) {
            let count = 0;

            // Look upwards
            for(let i = y - 1; i >= 0; i--){
                if(mapCopy[i][x] === '#') {
                    count++;
                    break;
                } else if(mapCopy[i][x] === 'L') {
                    break;
                }
            }
            // Look downwards
            for(let i = y + 1; i < mapCopy.length; i++) {
                if(mapCopy[i][x] === '#') {
                    count++;
                    break;
                } else if(mapCopy[i][x] === 'L') {
                    break;
                }
            }
            // Look leftwards
            for(let i = x - 1; i >= 0; i--) {
                if(mapCopy[y][i] === '#') {
                    count++;
                    break;
                } else if(mapCopy[y][i] === 'L') {
                    break;
                }
            }
            // Look rightwards
            for(let i = x + 1; i < mapCopy[y].length; i++) {
                if(mapCopy[y][i] === '#') {
                    count++;
                    break;
                } else if(mapCopy[y][i] === 'L') {
                    break;
                }
            }
            // Look left-upwards
            for(let i = 1; y - i >= 0 && x - i >= 0; i++) {
                if(mapCopy[y - i][x - i] === '#') {
                    count++;
                    break;
                } else if(mapCopy[y - i][x - i] === 'L') {
                    break;
                }
            }
            // Look right-upwards
            for(let i = 1; y - i >= 0 && x + i < mapCopy[y - i].length; i++) {
                if(mapCopy[y - i][x + i] === '#') {
                    count++;
                    break;
                } else if(mapCopy[y - i][x + i] === 'L') {
                    break;
                }
            }
            // Look right-downwards
            for(let i = 1; y + i < mapCopy.length && x + i < mapCopy[y + i].length; i++) {
                if(mapCopy[y + i][x + i] === '#') {
                    count++;
                    break;
                } else if(mapCopy[y + i][x + i] === 'L') {
                    break;
                }
            }
            // Look left-downwards
            for(let i = 1; y + i < mapCopy.length && x - i >= 0; i++) {
                if(mapCopy[y + i][x - i] === '#') {
                    count++;
                    break;
                } else if(mapCopy[y + i][x - i] === 'L') {
                    break;
                }
            }
            return count;
        }

        do {
            seatMap.update();
        } while(!seatMap.isStable);
        writeData(11, level, seatMap.occupiedSeats())
    }
}

exports.day = execute;