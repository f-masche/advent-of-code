const entryRegexp = /^\[\d+\-\d+\-\d+\s+\d+:(\d+)\]\s(.+)$/

function addSleep(start, end, table) {
  for (let i = start; i < end; i++) {
    table[i] += 1;
  }
  return table;
};

module.exports = {
  parseEntry(entry) {
    const matches = entry.match(entryRegexp);
    const minute  = Number(matches[1]);

    let action;
    let guardId;

    if (matches[2] === 'wakes up') {
      return { minute, action: 'wakeup' };
    } else if (matches[2] === 'falls asleep') {
      return { minute, action: 'sleep' };
    } else {
      const guardId = matches[2].match(/^\w+\s+#(\d+)/)[1];
      return { minute, action: 'change', guardId };
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
        addSleep(sleepStart, entry.minute, sleepByGuard[guardId]);
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

  getMaxSleepMinute(sleep) {
    let maxSleepMinute = 0;
    let maxSleep = 0;

    for (let i = 0; i < sleep.length; i++) {
      if (sleep[i] > maxSleep) {
        maxSleepMinute = i;
        maxSleep = sleep[i];
      }
    }
    return {
      minute: maxSleepMinute,
      sleep: maxSleep
    };
  }
}
