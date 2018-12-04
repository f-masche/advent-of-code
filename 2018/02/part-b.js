const Puzzle = require('../puzzle');

function run(lines) {
  const result = lines.map((line) => {
    const counts = {};
    const result = {
      twice: 0,
      threeTimes: 0
    };

    for (const letter of line.split('')) {
      counts[letter] = counts[letter] || 0;
      counts[letter] += 1;
    }

    for (const key of Object.keys(counts)) {
      const value = counts[key];
      if (value === 3) {
        result.threeTimes += 1;
      } else if (value === 2) {
        result.twice += 1;
      }
    }

    return result;
  })
  .reduce((acc, count) => {
    if (count.threeTimes) {
      acc.threeTimes++;
    }
    if (count.twice) {
      acc.twice++;
    }
    return acc;
  }, {
    twice: 0,
    threeTimes: 0
  });

  return String(result.twice * result.threeTimes);
}

const puzzle = new Puzzle('02 B');
puzzle.addTest('input/test-b.txt', '12');
puzzle.setInput('input/input-b.txt');
puzzle.setSolution(run);

module.exports = puzzle;
