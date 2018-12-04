const Puzzle = require('../puzzle');
const { map, maxBy, sum, chain } = require('lodash');
const { parseEntry, getSleepByGuard, addSleep, getMaxSleepMinute } = require('./lib');

function getMaxSleepGuard(sleepByGuard) {
  return chain(sleepByGuard)
    .map((value, key) => ({ guardId: key, sleep: value}))
    .maxBy(x => x.sleep)
    .value().guardId;
}

function run(input) {
  const entries = input.sort().map(parseEntry);
  const sleepByGuard = getSleepByGuard(entries);
  const maxSleepGuardId = getMaxSleepGuard(sleepByGuard);
  const { minute } = getMaxSleepMinute(sleepByGuard[maxSleepGuardId]);

  return minute * maxSleepGuardId;
}

const puzzle = new Puzzle('04 A');
puzzle.addTest('input/test-a.txt', 240);
puzzle.setInput('input/input-a.txt');
puzzle.setSolution(run);

module.exports = puzzle;
