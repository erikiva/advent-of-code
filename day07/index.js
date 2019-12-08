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

const calculateInstructions = (instructions, input)  => {
    //console.log(instructions); 
    let index = 0;
    let output = 0;
    while (true) {
      if (index == instructions.length -1 || instructions[index] == 99) break;
      //console.log('not breaking', instructions[index]);
      let opcode = getOpcode(instructions[index]);
      //console.log(index, opcode, instructions[index], instructions.join(' '));
      if (opcode[4] == 1 || opcode[4] == 2 || opcode[4] == 7 || opcode[4] == 8){
        let value1 = getOperandValue(opcode[2], index + 1, instructions);
        let value2 = getOperandValue(opcode[1], index + 2, instructions);
        let finalPosition = opcode[0] == 0 ? instructions[index + 3] : index + 3;
        //console.log('calculated values are', value1, value2, finalPosition)
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
        instructions[finalPosition] = result;
        index = index + 4;
      } else if (opcode[4] == 5) {
        let param = opcode[2] == 0 
          ? instructions[instructions[index + 1]] 
          : instructions[index + 1];
          if (param > 0) {
            let position = opcode[1] == 0 
              ? instructions[instructions[index + 2]] 
              : instructions[index + 2]; 
            index = position;
              //console.log('5 - ', param, ' - ', position);
          } else {
            index = index + 3;
          }
      } else if (opcode[4] == 6) {
        let param = opcode[2] == 0 
          ? instructions[instructions[index + 1]] 
          : instructions[index + 1];
          if (param == 0) {
            let position = opcode[1] == 0 
              ? instructions[instructions[index + 2]] 
              : instructions[index + 2]; 
              //console.log('6 - ', param, ' - ', position);
            index = position;
          } else {
            index = index + 3;
          }
      } else { 
        if (opcode[4] == 3){
          position = opcode[2] == 0 ? instructions[index+1] : index + 1;
          instructions[position] = input.next().value;
        } else if (opcode[4] == 4) {
          position = opcode[2] == 0 ? instructions[index+1] : index + 1;
          //console.log('output', instructions[position])
          output = instructions[position];
        }
        index = index + 2;
      }
    }
    return output;
    //console.log('final instructions', instructions);
    //return instructions[0];
    //console.log(instructions);
}

//const sampleInput = [4,3, 2,1,0];
//const sampleData = [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0];

//const sampleInput = [0,1, 2,3,4];
//const sampleData = [3,23,3,24,1002,24,10,24,1002,23,-1,23, 101,5,23,23,1,24,23,23,4,23,99,0,0];

const sampleInput = [1,0,4,3,2];
const sampleData = [3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33, 1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0];

function* inputGenerator(arr){
  for (let i= 0; i<arr.length; i++){
	  yield arr[i];
  }
}

function* sequenceGenerator(){
  for (let i = 0; i <= 4; i++){
    for (let j = 0; j <= 4; j++){
      for (let k = 0; k <= 4; k++){
        for (let l = 0; l <= 4; l++){
          for (let m = 0; m <= 4; m++){
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
  let previousResult = 0;
  console.log(input);
  for (let i = 0; i < input.length; i++){
    let inputGen = inputGenerator([input[i], previousResult]);
    previousResult = calculateInstructions([...data], inputGen);
    //console.log(previousResult);
  }
  return previousResult;
}

const calculateMaxSignal =  (data) => {
  let maxSignal = 0;
  let inputs = sequenceGenerator();
  for (let input of inputs){
    const signal = calculateSignal([...data], input);
    if (signal > maxSignal) {
      maxSignal = signal;
    }
  }
  console.log('max signal is: ', maxSignal)
  
} 
calculateMaxSignal(data);
//calculateSignal(sampleData, [ 4, 4, 4, 4, 3 ]);
