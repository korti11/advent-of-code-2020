# advent-of-code-2020
This are my solutions for Advent of Code 2020 written in JavaScript for NodeJS: https://adventofcode.com/2020

## Prerequisite 
- Node (14.15.1 at the time I'm writing this)

## Implementation notes
- Each day is implemented in a separate folder under the `src` folder. The naming schema for these folders is `day{number_of_the_day}`. Example: `day1`
- In each of these day folders there is one `index.js` file. All with the same base structure. Look at the `src/sample/index.js` file for the base structure.
- The `data-provider.js` file has a method to load the input data. The naming schema for input files is `day{number_of_the_day}-{level}.txt`. The second method is is to write out the solution, this method automatically stringifies the given data to write out. The naming schema for solution files is `day{number_of_the_day}-{level}-solution.txt`.

## Usage
1. `npm i` or `npm install` or `npm ci`
2. Run the code.
    - `npm run start` run the current day. Example: If it is the 8th of the current month then day 8 will be executed.
    - `npm run start {day}` run a specific day. Example: `npm run start 8` then day 8 will be executed.
