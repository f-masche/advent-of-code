import Puzzle from '../puzzle';

function run(input: string[]) {
  const visited = {};

  let result = {
    sum: 0,
    duplicates: []
  };

  while(!result.duplicates.length) {
    result = input.reduce((acc, line) => {
      const [_, sign, numString] = line.split(/^([+-])(\d+)$/);

      const number = Number(numString);

      if (sign === '+') {
        acc.sum += number;
      } else {
        acc.sum -= number;
      }

      if (visited[acc.sum]) {
        acc.duplicates.push(acc.sum)
      }

      visited[acc.sum] = true;
      return acc;
    }, result);
  }

  return result.duplicates[0].toString();
}

const puzzle = new Puzzle('1.2');
puzzle.setInput('input/input2.txt');
puzzle.addTest('input/test2.txt', '10');
puzzle.setSolution(run);

export default puzzle;
