const Puzzle = require('../puzzle');
const { react } = require('./lib');
const { chain, without, range } = require('lodash');

function run(input) {
  const polymer = input[0].split('');
  const reactedPolymer = react(polymer);

  return chain(range(0, 26))
    .map(i => without(reactedPolymer, String.fromCharCode(i + 65), String.fromCharCode(i + 97)))
    .map(poly => react(poly).length)
    .min()
    .value();
}

const puzzle = new Puzzle('05 A');
puzzle.addTest('input/test-a.txt', 4);
puzzle.setInput('input/input-a.txt');
puzzle.setSolution(run);

module.exports = puzzle;
