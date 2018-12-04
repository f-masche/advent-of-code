const Puzzle = require('../puzzle');
const { intersection, map, isEqual  } = require('lodash');

function run(input) {
  const lines = map(input, l => l.split(''));
  for (const line of lines) {
    for (const otherLine of lines) {
      if (line === otherLine) continue;
      const same = intersection(line, otherLine);
      if (same.length === line.length - 1) {
        return same.join('');
      }
    }
  }
}

const puzzle = new Puzzle('02 A');
puzzle.addTest('input/test-a.txt', 'fgij');
puzzle.setInput('input/input-a.txt');
puzzle.setSolution(run);

module.exports = puzzle;
