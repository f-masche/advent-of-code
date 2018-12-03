interface Test {
  file: string, solution: string
}

type Solution = (input: string[]) => string;

export default class puzzle {
  private solution: Solution;

  private input: string;

  private tests: Test[];

  constructor(public name: string) {
    this.tests = [];
  }

  run(input: string[]) {
    return this.solution(input);
  }

  setSolution(fn: Solution) {
    this.solution = fn;
  }

  setInput(fileName: string) {
    this.input = fileName;
  }

  addTest(file: string, solution: string) {
    this.tests.push({ file, solution });
  }

  getTests(): Test[] {
    return this.tests.slice();
  }

  getInput(): string {
    return this.input;
  }
}
