module.exports = {
  react(polymer) {
    let newPolymer = [];

    for (let i = 0; i < polymer.length; i++) {
      let char = polymer[i];
      let prev = newPolymer[newPolymer.length - 1];

      if(prev
        && prev !== char
        && prev.toLowerCase() === char.toLowerCase()) {
        newPolymer.pop();
      } else {
        newPolymer.push(char);
      }
    }
    return newPolymer;
  }
}
