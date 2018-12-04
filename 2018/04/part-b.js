const Puzzle = require('../puzzle');
const { map, maxBy, sum, chain } = require('lodash');
const { parseEntry, getSleepByGuard, addSleep, getMaxSleepMinute } = require('./lib');

function getGuardWithMaxSleepMinute(sleepByGuard) {
  return chain(sleepByGuard)
    .map((value, key) => ({
      guardId: key,
      ...getMaxSleepMinute(value)
    }))
    .maxBy(x => x.sleep)
    .value();
}

function run(input) {
  const entries = input.sort().map(parseEntry);
  const sleepByGuard = getSleepByGuard(entries);
  const { minute, guardId } = getGuardWithMaxSleepMinute(sleepByGuard);

  return minute * guardId;
}

const puzzle = new Puzzle('04 B');
puzzle.addTest('input/test-a.txt', 4455);
puzzle.setInput('input/input-a.txt');
puzzle.setSolution(run);

module.exports = puzzle;
