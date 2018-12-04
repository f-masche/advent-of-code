const Puzzle = require('../puzzle');
const { parseEntry, getSleepByGuard, addSleep, getMaxSleepMinute } = require('./lib');

function getGuardWithMaxSleepMinute(sleepByGuard) {
  let maxGuardId;
  let maxMinute;
  let maxSleep = 0;

  for (const guardId of Object.keys(sleepByGuard)) {
    const { minute, sleep } = getMaxSleepMinute(sleepByGuard[guardId]);

    if (sleep > maxSleep) {
      maxSleep = sleep;
      maxMinute = minute;
      maxGuardId = guardId;
    }
  }

  return {
    guardId: maxGuardId,
    minute: maxMinute
  }
}

function run(input) {
  const entries = input.sort().map(parseEntry);
  const sleepByGuard = getSleepByGuard(entries);
  const { minute, guardId } = getGuardWithMaxSleepMinute(sleepByGuard);

  return String(minute * guardId);
}

const puzzle = new Puzzle('04 B');
puzzle.addTest('input/test-a.txt', '4455');
puzzle.setInput('input/input-a.txt');
puzzle.setSolution(run);

module.exports = puzzle;
