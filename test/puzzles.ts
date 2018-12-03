import 'mocha';
import { expect } from 'chai';
import * as glob from 'glob';
import { dirname, relative, join } from 'path';
import { readFileSync } from 'fs';

const tests = [];
const files = glob('src/*/**/*.ts', { sync: true });

for (const file of files) {
  const filePath = dirname(file);
  const puzzleModule = require(relative(__dirname, file));
  const puzzle = puzzleModule.default;
  let input: string[];

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

function getInputLines(file: string) {
  const inputStr = readFileSync(file, 'utf-8');
  return inputStr.split('\n').filter(line => line.trim());
}

describe('Advent of Code', async () => {
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
