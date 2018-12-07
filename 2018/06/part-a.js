const Puzzle = require('../puzzle');
const { map, max, minBy, chain, filter, flatten, difference, sumBy } = require('lodash');

function distance(point, otherPoint) {
  return Math.abs(point[0] - otherPoint[0])
  + Math.abs(point[1] - otherPoint[1]);
}

function run(input) {
  const points = map(input, line => map(line.split(','), x => Number(x)));
  const maxX = max(map(points, p => p[0]));
  const maxY = max(map(points, p => p[1]));
  const area = map(Array(maxY + 1), x => Array(maxX + 1).fill(0));
  const edgePoints = new Set();

  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX; x++) {
      let min = Number.MAX_VALUE;
      let p;

      for (let i = 0; i < points.length; i++) {
        const d = distance(points[i], [x, y]);
        if (min === d) {
          p = '*';
        }
        if (d < min) {
          min = d;
          p = points[i];
        }
      }

      if (x === 0 || y === 0 || x === maxX || y === maxY) {
        edgePoints.add(p);
      }
      area[y][x] = p;
    }
  }


  const centerPoints = difference(points, Array.from(edgePoints));
  const markedPoints = flatten(area);

  return max(map(centerPoints, point => sumBy(markedPoints, p => p === point)))
}

const puzzle = new Puzzle('06 A');
puzzle.addTest('input/test-a.txt', 17);
puzzle.setInput('input/input-a.txt');
puzzle.setSolution(run);

module.exports = puzzle;
