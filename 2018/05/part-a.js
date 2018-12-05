const Puzzle = require('../puzzle');
const { react } = require('./lib');

function run(input) {
  const polymer = input[0].split('');
  return react(polymer).length;
}

const puzzle = new Puzzle('05 A');
puzzle.addTest('input/test-a.txt', 10);
puzzle.setInput('input/input-a.txt');
puzzle.setSolution(run);

module.exports = puzzle;
