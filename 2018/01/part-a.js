const Puzzle = require('../puzzle');
const { map, sum } = require('lodash');

function run(input) {
  return sum(map(input, x => +x));
}

const puzzle = new Puzzle('01 A');
puzzle.addTest('input/test-a.txt', 3);
puzzle.setInput('input/input-a.txt');
puzzle.setSolution(run);

module.exports = puzzle;
