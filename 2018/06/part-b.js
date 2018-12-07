const Puzzle = require('../puzzle');
const { map, max, minBy, chain, filter, flatten, difference, sum } = require('lodash');

function distance(point, otherPoint) {
  return Math.abs(point[0] - otherPoint[0])
  + Math.abs(point[1] - otherPoint[1]);
}

function run(input) {
  const maxDistance = input.length < 10 ? 32 : 10000;
  const points = map(input, line => map(line.split(','), x => Number(x)));
  const maxX = max(map(points, p => p[0]));
  const maxY = max(map(points, p => p[1]));
  const area = map(Array(maxY + 1), x => Array(maxX + 1).fill(0));
  const edgePoints = new Set();

  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX; x++) {
      const d = sum(map(points, p => distance(p, [x, y])));
      area[y][x] = d < maxDistance;
    }
  }

  return filter(flatten(area), x => x).length;
}

const puzzle = new Puzzle('06 B');
puzzle.addTest('input/test-a.txt', 16);
puzzle.setInput('input/input-a.txt');
puzzle.setSolution(run);

module.exports = puzzle;
