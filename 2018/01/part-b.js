const Puzzle = require('../puzzle');
const { map, find } = require('lodash');

function run(input) {
  const visited = {};
  const values = map(input, x => +x);

  let sum = 0;
  let duplicate;

  while(!duplicate) {
    duplicate = find(values, value => {
      sum += value;
      if (visited[sum]) return true;
      visited[sum] = true;
    });
  }

  return sum;
}

const puzzle = new Puzzle('01 B');
puzzle.setInput('input/input-b.txt');
puzzle.addTest('input/test-b.txt', 10);
puzzle.setSolution(run);

module.exports = puzzle;
