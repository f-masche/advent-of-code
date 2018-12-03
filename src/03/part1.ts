import Puzzle from '../puzzle';

const claimRegexp = /^#\d+\s*@\s*(\d+),(\d+):\s*(\d+)x(\d+)$/;

function parseClaim(line: string) {
  const matches = line.match(claimRegexp);
  return {
    x: Number(matches[1]),
    y: Number(matches[2]),
    x2: Number(matches[1]) + Number(matches[3]) - 1,
    y2: Number(matches[2]) + Number(matches[4]) - 1
  };
}

function run(lines: string[]): string {
  const claims = lines.map(parseClaim);
  const fabric: number[][] = [];

  for (let y = 0; y < 1000; y++) {
    fabric[y] = [];
    for (let x = 0; x < 1000; x++) {
      fabric[y][x] = 0;
    }
  }

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

const puzzle = new Puzzle('3.1');

puzzle.addTest('input/test1.txt', '4');
puzzle.setInput('input/input1.txt');
puzzle.setSolution(run);

export default puzzle;
