const Puzzle = require('../puzzle');

const claimRegexp = /^#\d+\s*@\s*(\d+),(\d+):\s*(\d+)x(\d+)$/;

function parseClaim(line) {
  const matches = line.match(claimRegexp);
  return {
    x: Number(matches[1]),
    y: Number(matches[2]),
    x2: Number(matches[1]) + Number(matches[3]) - 1,
    y2: Number(matches[2]) + Number(matches[4]) - 1
  };
}

function getFabric(size) {
  const fabric = Array(size);

  for (let y = 0; y < size; y++) {
    fabric[y] = Array(size);
    for (let x = 0; x < size; x++) {
      fabric[y][x] = 0;
    }
  }
  return fabric;
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

  const claimed = fabric.reduce((sum, row) => sum + row.filter(x => x > 1).length, 0);
  return String(claimed);
}

const puzzle = new Puzzle('03 A');
puzzle.addTest('input/test-a.txt', '4');
puzzle.setInput('input/input-a.txt');
puzzle.setSolution(run);

module.exports = puzzle;
