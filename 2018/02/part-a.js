const Puzzle = require('../puzzle');

function run(lines) {
  for (const line of lines) {
    for (const otherLine of lines) {
      if (line === otherLine) continue;

      let same = [];

      for (let i = 0; i < line.length; i++) {
        if (same.length < i - 1) break;

        if (line[i] === otherLine[i]) {
          same.push(line[i]);
        }
      }

      if (same.length === line.length - 1) {
        return same.join('');
      }
    }
  }
  return '';
}

const puzzle = new Puzzle('02 A');
puzzle.addTest('input/test-a.txt', 'fgij');
puzzle.setInput('input/input-a.txt');
puzzle.setSolution(run);

module.exports = puzzle;
