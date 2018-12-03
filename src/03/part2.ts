import Puzzle from '../puzzle';

const claimRegexp = /^(#\d+)\s*@\s*(\d+),(\d+):\s*(\d+)x(\d+)$/;

function parseClaim(line: string) {
  const matches = line.match(claimRegexp);
  return {
    id: matches[1],
    x: Number(matches[2]),
    y: Number(matches[3]),
    x2: Number(matches[2]) + Number(matches[4]) - 1,
    y2: Number(matches[3]) + Number(matches[5]) - 1
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

  for (const claim of claims) {
    let overlapped = false;

    for (let y = claim.y; y <= claim.y2 && !overlapped; y++) {
      for (let x = claim.x; x <= claim.x2 && !overlapped; x++) {
        if (fabric[y][x] > 1) {
          overlapped = true;
        }
      }
    }

    if (!overlapped) {
      return claim.id;
    }
  }
  return '';
}

const puzzle = new Puzzle('3.2');

puzzle.addTest('input/test1.txt', '#3');
puzzle.setInput('input/input1.txt');
puzzle.setSolution(run);

export default puzzle;
