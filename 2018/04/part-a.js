const Puzzle = require('../puzzle');

const puzzle = new Puzzle('04 A');
puzzle.addTest('input/test-a.txt', '240');
// puzzle.setInput('input/input-a.txt');
puzzle.setSolution(run);

module.exports = puzzle;
