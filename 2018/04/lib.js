const entryRegexp = /(\d+)(?!.*\d)/
const { map, maxBy } = require('lodash');

function addSleep(start, end, table) {
  return map(table, (x, i) => (i >= start && i < end) ? x + 1 : x);
};

module.exports = {
  parseEntry(entry) {
    const lastNumber = +entry.match(entryRegexp)[1];

    if (entry.endsWith('wakes up')) {
      return { minute: lastNumber, action: 'wakeup' };
    } else if (entry.endsWith('falls asleep')) {
      return { minute: lastNumber, action: 'sleep' };
    } else {
      return { action: 'change', guardId: lastNumber };
    }
  },

  getSleepByGuard(entries) {
    let sleepByGuard = {};
    let guardId;
    let sleepStart;

    for (const entry of entries) {
      if (entry.action === 'sleep') {
        sleepStart = entry.minute;
      } else if (entry.action === 'wakeup') {
        sleepByGuard[guardId] = addSleep(sleepStart, entry.minute, sleepByGuard[guardId]);
      } else {
        guardId = entry.guardId;
        if (!sleepByGuard[guardId]) {
          sleepByGuard[guardId] = Array(60);
          sleepByGuard[guardId].fill(0);
        }
      }
    }
    return sleepByGuard;
  },

  getMaxSleepMinute(sleepMinutes) {
    return maxBy(map(sleepMinutes, (sleep, minute) => ({ sleep, minute })), x => x.sleep);
  }
}
