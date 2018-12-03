import Puzzle from '../puzzle';

function run(lines: string[]) {
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

const puzzle = new Puzzle('2.2');
puzzle.addTest('input/test1.txt', 'fgij');
puzzle.setInput('input/input1.txt');
puzzle.setSolution(run);

export default puzzle;
