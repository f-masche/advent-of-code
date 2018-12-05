module.exports = {
  react(polymer) {
    let prev = [];
    let startPointer = 0;

    while(prev.length !== polymer.length) {
      prev = polymer;

      for (let i = startPointer; i < polymer.length - 1; i++) {
        let char = polymer[i];
        let nextChar = polymer[i + 1];

        if (char !== nextChar) {
          if (char.toLowerCase() === nextChar.toLowerCase()) {
            startPointer = Math.max(0, i - 1);
            polymer = polymer.slice(0, i).concat(polymer.slice(i + 2));
            break;
          }
        }
      }
    }
    return polymer;
  }
}
