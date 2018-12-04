const Puzzle = require('../puzzle');
const { parseEntry, getSleepByGuard, addSleep, getMaxSleepMinute } = require('./lib');

function getMaxSleepGuard(sleepByGuard) {
  let max = 0;
  let maxGuardId;

  for(const guardId of Object.keys(sleepByGuard)) {
    const sleep = sleepByGuard[guardId].reduce((sum, time) => sum + time, 0);
    if (sleep > max) {
      max = sleep;
      maxGuardId = guardId;
    }
  }

  return maxGuardId;
}

function run(input) {
  const entries = input.sort().map(parseEntry);

  const sleepByGuard = getSleepByGuard(entries);
  const maxSleepGuardId = getMaxSleepGuard(sleepByGuard);
  const { minute } = getMaxSleepMinute(sleepByGuard[maxSleepGuardId]);

  return String(minute * maxSleepGuardId);
}

const puzzle = new Puzzle('04 A');
puzzle.addTest('input/test-a.txt', '240');
puzzle.setInput('input/input-a.txt');
puzzle.setSolution(run);

module.exports = puzzle;
