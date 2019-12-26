class Computer {
  constructor(instructions, input) {
    this.pc = 0;
    this.instructions = [...instructions];
    this.base = 0;
    this.input = input;
    this.ig = inputGenerator(input);
    this.output;
    this.status;
    this.debug = false;
  }

  addInput(input) {
    this.input.push(input);
  }

  addInputArray(inputArr) {
    this.input.push(...inputArr);
  }

  getOutput() {
    return this.output;
  }

  getOpcodeMnemonic(opcode) {
    switch (opcode[4]) {
      case 1:
        return "add";
      case 2:
        return "mul";
      case 3:
        return "input";
      case 4:
        return "output";
      case 5:
        return "jnz";
      case 6:
        return "jz";
      case 7:
        return "lt";
      case 8:
        return "eq";
      case 9:
        return "base";
    }
  }

  log(...args) {
    this.debug && console.log(...args);
  }

  getOpcodeLength(opcode) {
    let opCodeLength;
    switch (opcode[4]) {
      case 1:
      case 2:
      case 7:
      case 8:
        opCodeLength = 4;
        break;
      case 5:
      case 6:
        opCodeLength = 3;
        break;
      default:
        opCodeLength = 2;
    }
    return opCodeLength;
  }

  decodeMemoryReference(opcode, index) {
    let mode = opcode[3 - index];
    let operand = this.instructions[this.pc + index];
    switch (mode) {
      case 0:
        return `[${operand}]`;
      case 1:
        return operand;
      case 2:
        return "[bp+" + operand + "]";
    }
  }

  decodeOpCode(opcode) {
    let decoded = this.getOpcodeMnemonic(opcode);
    let i = 1;
    switch (this.getOpcodeLength(opcode)) {
      case 4:
        decoded += " " + this.decodeMemoryReference(opcode, i++);
      case 3:
        decoded += " " + this.decodeMemoryReference(opcode, i++);
      case 2:
        decoded += " " + this.decodeMemoryReference(opcode, i++);
        break;
    }

    return decoded;
  }

  getOpcode(num) {
    const numArray = num
      .toString()
      .split("")
      .map(digit => parseInt(digit));
    while (numArray.length < 5) {
      numArray.unshift(0);
    }
    //this.log(this.instructions.slice(this.pc, this.pc+this.getOpcodeLength(numArray)))
    this.log(`pc=${this.pc} bp=${this.base} | ` + this.decodeOpCode(numArray));
    return numArray;
  }

  getOperandValue(mode, index, list) {
    let result;
    switch (mode) {
      case 0:
        result = list[list[index]] || 0;
        break;
      case 1:
        result = list[index] || 0;
        break;
      case 2:
        result = list[this.base + list[index]] || 0;
        break;
    }
    this.log("read", result, "from", this.getOutputPosition(mode, index));
    return result;
  }

  readMemory(mode, pointer) {
    return this.instructions[this.getOutputPosition(mode, pointer)] || 0;
  }

  writeMemory(mode, pointer, value) {
    let position = this.getOutputPosition(mode, pointer);
    this.log("write", value, "to", position);
    this.instructions[position] = value;
  }

  getOutputPosition(mode, index) {
    switch (mode) {
      case 0:
        return this.instructions[index];
      case 1:
        return index;
      case 2:
        return this.base + this.instructions[index];
    }
  }

  opcodeIsValid(opcode) {
    if (opcode[3] != 0) {
      return false;
    }
    let len = this.getOpcodeLength(opcode);

    if (len < 4 && opcode[0] != 0) return false;
    if (len < 3 && opcode[1] != 0) return false;

    return true;
  }

  calculateInstructions() {
    let index = this.pc;
    // this.output = undefined;
    while (
      true &&
      this.instructions[index] != 0 &&
      this.instructions[index] != 1000
    ) {
      this.pc = index;
      if (
        index == this.instructions.length - 1 ||
        this.instructions[index] == 99
      )
        return (this.status = "stop");
      let opcode = this.getOpcode(this.instructions[index]);
      // this.log(`   main params - base: ${this.base} - index: ${index} - opcode: ${opcode.join('')} `);
      if (!this.opcodeIsValid(opcode)) {
        this.log("illegal instruction", opcode, "at", index);
        break;
      }
      if (
        opcode[4] == 1 ||
        opcode[4] == 2 ||
        opcode[4] == 7 ||
        opcode[4] == 8
      ) {
        let value1 = this.getOperandValue(
          opcode[2],
          index + 1,
          this.instructions
        );
        let value2 = this.getOperandValue(
          opcode[1],
          index + 2,
          this.instructions
        );
        let finalPosition = this.getOutputPosition(opcode[0], index + 3);
        // this.log(` instruction ${opcode[4]}:  ${value1} -  ${value2} ->  ${finalPosition}`);
        let result = 0;
        if (opcode[4] == 1) {
          result = value1 + value2;
        } else if (opcode[4] == 2) {
          result = value1 * value2;
        } else if (opcode[4] == 7) {
          if (value1 < value2) {
            result = 1;
          } else {
            result = 0;
          }
        } else if (opcode[4] == 8) {
          if (value1 == value2) {
            result = 1;
          } else {
            result = 0;
          }
        }
        this.writeMemory(opcode[0], index + 3, result);
        //this.instructions[finalPosition] = result;
        index = index + 4;
      } else if (opcode[4] == 5) {
        let param = this.getOperandValue(
          opcode[2],
          index + 1,
          this.instructions
        );
        if (param != 0) {
          let position = this.getOperandValue(
            opcode[1],
            index + 2,
            this.instructions
          );
          index = position;
          this.log(`jump to ${position}`);
        } else {
          index = index + 3;
        }
      } else if (opcode[4] == 6) {
        let param = this.getOperandValue(
          opcode[2],
          index + 1,
          this.instructions
        );
        if (param == 0) {
          let position = this.getOperandValue(
            opcode[1],
            index + 2,
            this.instructions
          );
          this.log(`jump to ${position}`);
          index = position;
        } else {
          index = index + 3;
        }
      } else if (opcode[4] == 9) {
        let value = this.getOperandValue(
          opcode[2],
          index + 1,
          this.instructions
        );
        // this.log(` instruction ${opcode[4]}:  ${value}`);
        this.base = this.base + value;
        index = index + 2;
      } else if (opcode[4] == 3) {
        let position = this.getOutputPosition(opcode[2], index + 1);
        const value = this.ig.next().value;
        this.log(
          `------ instruction ${opcode[4]}:  ${value} - ${position} ${
            this.instructions[index + 1]
          }`
        );
        if (value == -1) {
          this.pc = index;
          return (this.status = "read");
        }
        this.instructions[position] = value;
        this.writeMemory(opcode[2], index + 1, value);
        index = index + 2;
        this.pc = index;
      } else if (opcode[4] == 4) {
        let value = this.getOperandValue(
          opcode[2],
          index + 1,
          this.instructions
        );
        this.output = value;
        this.pc = index + 2;
        return (this.status = "write");
      }
    }
  }
}

//const sampleInput = [1,0,4,3,2];
//const sampleData = [3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33, 1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0];

function* inputGenerator(arr) {
  while (true) {
    if (arr.length > 0) {
      yield arr.shift();
    } else yield -1;
  }
}

const calculateKeycode = (data, input = [1]) => {
  let resume = true;
  const outputs = [];
  const intcode = new Amplifier(data, input);
  //this.log("input passed to program: ", input);
  while (resume) {
    resume = intcode.calculateInstructions();
    if (resume) outputs.push(intcode.output);
  }
  //this.log("**** Final output ****", outputs.join());
};

module.exports = {
  Computer
};

//calculateKeycode([3,3,1105,-1,9,1101,0,0,12,4,12,99,1], [9]);

//calculateKeycode(data, [72364876]);
// calculateKeycode([3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
//   1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
//   999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99], [7]);

//   calculateKeycode([3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
//     1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
//     999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99], [8]);
//     calculateKeycode([3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
//       1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
//       999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99], [9]);
//calculateKeycode([109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99]);
//calculateKeycode([1102,34915192,34915192,7,4,7,99,0])
//calculateKeycode([104,1125899906842624,99])
