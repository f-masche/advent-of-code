import Puzzle from '../puzzle';

function run(input: string[]): string {
  const result = input.reduce((total, line) => {
    const [_, sign, number] = line.split(/^([+-])(\d+)$/);

    if (sign === '+') {
      total += Number(number);
    } else {
      total -= Number(number);
    }
    return total;
  }, 0);
  return result.toString();
}

const puzzle = new Puzzle('1.1');
puzzle.addTest('input/test1.txt', '3');
puzzle.setInput('input/input1.txt');
puzzle.setSolution(run);

export default puzzle;
