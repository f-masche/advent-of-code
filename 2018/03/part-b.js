const Puzzle = require('../puzzle');
const { map, find } = require('lodash');

function parseClaim(line) {
  const [ id, x, y, width, height ] = map(line.match(/\d+/g), l => +l);
  return { id, x, y, x2: x + width - 1, y2: y + height - 1 };
}

function getFabric(size) {
  return map(Array(size), () => Array(size).fill(0));
}

function run(lines) {
  const claims = lines.map(parseClaim);
  const fabric = getFabric(1000);

  for (const claim of claims) {
    for (let y = claim.y; y <= claim.y2; y++) {
      for (let x = claim.x; x <= claim.x2; x++) {
        fabric[y][x] += 1;
      }
    }
  }

  return find(claims, claim => {
    for (let y = claim.y; y <= claim.y2; y++) {
      for (let x = claim.x; x <= claim.x2; x++) {
        if (fabric[y][x] > 1) {
          return false;
        }
      }
    }
    return true;
  }).id;
}

const puzzle = new Puzzle('03 B');
puzzle.addTest('input/test-a.txt', 3);
puzzle.setInput('input/input-a.txt');
puzzle.setSolution(run);

module.exports = puzzle;
