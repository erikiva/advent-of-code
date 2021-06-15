const data = require('./input.js') 

const getOpcode = num => {
  const numArray = num.toString().split('').map(digit => parseInt(digit));
  while (numArray.length < 5) {
    numArray.unshift(0);
  }
  return numArray;
}

const getOperandValue = (mode, index, list) => {
  return mode == 0 ?  list[list[index]] :  list[index];
}

class Amplifier {
  constructor(instructions, input) {
    this.pc = 0;
    this.instructions = [...instructions];
    this.input = input;
    this.ig = inputGenerator(input);
    this.output;
  }

  calculateInstructions() {
    let index = this.pc;
    let output = 0;
    while (true) {
      if (index == this.instructions.length -1 || this.instructions[index] == 99) return false;
      let opcode = getOpcode(this.instructions[index]);
      if (opcode[4] == 1 || opcode[4] == 2 || opcode[4] == 7 || opcode[4] == 8){
        let value1 = getOperandValue(opcode[2], index + 1, this.instructions);
        let value2 = getOperandValue(opcode[1], index + 2, this.instructions);
        let finalPosition = opcode[0] == 0 ? this.instructions[index + 3] : index + 3;
        let result = 0;
        if (opcode[4] == 1) {
          result = value1 + value2;
        } else if (opcode[4] == 2){
          result = value1 * value2;
        } else if (opcode[4] == 7) {
          if (value1 < value2){
            result = 1;
          } else {
            result = 0;
          }
        } else if (opcode[4] == 8) {
          if (value1 == value2){
            result = 1;
          } else {
            result = 0;
          }
        }
        this.instructions[finalPosition] = result;
        index = index + 4;
      } else if (opcode[4] == 5) {
        let param = opcode[2] == 0 
          ? this.instructions[this.instructions[index + 1]] 
          : this.instructions[index + 1];
          if (param > 0) {
            let position = opcode[1] == 0 
              ? this.instructions[this.instructions[index + 2]] 
              : this.instructions[index + 2]; 
            index = position;
              //console.log('5 - ', param, ' - ', position);
          } else {
            index = index + 3;
          }
      } else if (opcode[4] == 6) {
        let param = opcode[2] == 0 
          ? this.instructions[this.instructions[index + 1]] 
          : this.instructions[index + 1];
          if (param == 0) {
            let position = opcode[1] == 0 
              ? this.instructions[this.instructions[index + 2]] 
              : this.instructions[index + 2]; 
              //console.log('6 - ', param, ' - ', position);
            index = position;
          } else {
            index = index + 3;
          }
      } else { 
        if (opcode[4] == 3){
          let position = opcode[2] == 0 ? this.instructions[index+1] : index + 1;
          this.instructions[position] = this.ig.next().value;
          index = index + 2;
        } else if (opcode[4] == 4) {
          let position = opcode[2] == 0 ? this.instructions[index+1] : index + 1;
          this.output = this.instructions[position];
          this.pc = index + 2;
          return true;
        }
      }
    }
  }
}


const sampleInput = [1,0,4,3,2];
const sampleData = [3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33, 1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0];

function* inputGenerator(arr){
  for (let i= 0; i<arr.length; i++){
	  yield arr[i];
  }
}

function* sequenceGenerator(first, last){
  for (let i = first; i <= last; i++){
    for (let j = first; j <= last; j++){
      for (let k = first; k <= last; k++){
        for (let l = first; l <= last; l++){
          for (let m = 0; m <= last; m++){
            if (i != j && i != k && i != l && i != m &&
                j != k && j != l && j != m &&
                k != l && k != m && l != m ){
              yield [i, j, k, l, m]; 
            }
          }
        }
      } 
    }
  }
}

const calculateSignal = (data, input) => {
  console.log(input);
  let resume = true;
  let previousResult = 0;
  const amplifiers = [];
  for (let i = 0; i < input.length; i++){
    amplifiers.push(new Amplifier(data, [input[i]]));
  }
  let amp = 0;
  while (resume) {
    for (let amp = 0; amp < amplifiers.length; amp++) {
      amplifiers[amp].input.push(previousResult);
      resume = amplifiers[amp].calculateInstructions();
      previousResult = amplifiers[amp].output;
    }
    
  }
  console.log(amplifiers[4].output);
  return amplifiers[4].output;
}

const calculateMaxSignal =  (data) => {
  let maxSignal = 0;
  let inputs = sequenceGenerator(5, 9);
  for (let input of inputs){
    const signal = calculateSignal([...data], input);
    if (signal > maxSignal) {
      maxSignal = signal;
    }
  }
  console.log('max signal is: ', maxSignal)
  
} 
//calculateMaxSignal(data)
calculateMaxSignal([3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26, 27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5]);

//calculateSignal([3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26, 27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5], [9,8,7,6,5]);
