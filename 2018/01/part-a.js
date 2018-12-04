const Puzzle = require('../puzzle');

function run(input) {
  return input.reduce((total, line) =>
    total + parseInt(line, 10)
  , 0).toString();
}

const puzzle = new Puzzle('01 A');
puzzle.addTest('input/test-a.txt', '3');
puzzle.setInput('input/input-a.txt');
puzzle.setSolution(run);

module.exports = puzzle;
