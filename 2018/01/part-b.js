const Puzzle = require('../puzzle');

function run(input) {
  const visited = {};

  let result = {
    sum: 0,
    duplicates: []
  };

  while(!result.duplicates.length) {
    result = input.reduce((acc, line) => {
      acc.sum += parseInt(line, 10);

      if (visited[acc.sum]) {
        acc.duplicates.push(acc.sum)
      }

      visited[acc.sum] = true;
      return acc;
    }, result);
  }

  return result.duplicates[0].toString();
}

const puzzle = new Puzzle('01 B');
puzzle.setInput('input/input-b.txt');
puzzle.addTest('input/test-b.txt', '10');
puzzle.setSolution(run);

module.exports = puzzle;
