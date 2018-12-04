const { expect } = require('chai');
const  glob = require('glob');
const { dirname, relative, join } = require('path');
const { readFileSync } = require('fs');

const tests = [];
const files = glob('2018/*/**/part*.js', { sync: true });

for (const file of files) {
  const filePath = dirname(file);
  const puzzle = require(relative(__dirname, file));
  let input;

  if (puzzle.getInput()) {
    const inputStr = readFileSync(`${filePath}/${puzzle.getInput()}`, 'utf-8');
    input = inputStr.split('\n').filter(line => line.trim());
  }

  tests.push({
    puzzle,
    input,
    path: filePath
  });
}

function getInputLines(file) {
  const inputStr = readFileSync(file, 'utf-8');
  return inputStr.split('\n').filter(line => line.trim());
}

describe('Advent of Code', () => {
  tests.forEach(test => {
    describe(test.puzzle.name, () => {
      for (const { file, solution } of test.puzzle.getTests()) {
        it((`Test: ${file}`), () => {
          const input = getInputLines(join(test.path, file));
          expect(test.puzzle.run(input), `${test.puzzle.name} ${file}`)
            .to.equal(solution);
        });
      }

      if (test.input) {
        const result = test.puzzle.run(test.input);
        it(`Result: ${result}`, () => {});
      }
    });
  });
});
