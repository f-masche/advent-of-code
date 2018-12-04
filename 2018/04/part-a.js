const Puzzle = require('../puzzle');
 // [1518-11-01 00:00] Guard #10 begins shift

const entryRegexp = /^\[(\d+\-\d+\-\d+\s+\d+:\d+)\]\s(.+)$/

function parseEntry(entry) {
  const matches = entry.match(entryRegexp);
  const date = matches[1].replace(' ', 'T') + ':00';

  let action;
  let guardId;

  if (matches[2] === 'wakes up') {
    action = 'wakeup';
  } else if (matches[2] === 'falls asleep') {
    action = 'sleep';
  } else {
    action = 'change';
    guardId = matches[2].match(/^\w+\s+#(\d+)/)[1];
  }

  return {
    date: new Date(date),
    action,
    guardId
  }
}

function run(input) {
  console.log(input.map(parseEntry))
}

const puzzle = new Puzzle('04 A');
puzzle.addTest('input/test-a.txt', '240');
// puzzle.setInput('input/input-a.txt');
puzzle.setSolution(run);

module.exports = puzzle;
