module.exports = class puzzle {
  constructor(name) {
    this.name = name;
    this.tests = [];
    this.solution = null;
    this.input = '';
  }

  run(input) {
    return this.solution(input);
  }

  setSolution(fn) {
    this.solution = fn;
  }

  setInput(fileName) {
    this.input = fileName;
  }

  addTest(file, solution) {
    this.tests.push({ file, solution });
  }

  getTests() {
    return this.tests.slice();
  }

  getInput() {
    return this.input;
  }
}
