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
          instructions[position] = input;
        } else if (opcode[4] == 4) {
          position = opcode[2] == 0 ? instructions[index+1] : index + 1;
          console.log(instructions[position])
        }
        index = index + 2;
      }
    }
    //console.log('final instructions', instructions);
    //return instructions[0];
    //console.log(instructions);
}


//console.log('Should return 1');
//calculateInstructions([3,9,8,9,10,9,4,9,99,-1,8], 8);
//console.log('Should return 0');
//calculateInstructions([3,9,8,9,10,9,4,9,99,-1,8], 5);
//console.log('Should return 1');
//calculateInstructions([3,9,7,9,10,9,4,9,99,-1,8],7);
//console.log('Should return 0');
//calculateInstructions([3,9,7,9,10,9,4,9,99,-1,8],9);
//console.log('Should return 1');
//calculateInstructions([3,3,1108,-1,8,3,4,3,99],8);
//console.log('Should return 0');
//calculateInstructions([3,3,1108,-1,8,3,4,3,99],9);
//console.log('Should return 1');
//calculateInstructions([3,3,1107,-1,8,3,4,3,99],7);
//console.log('Should return 0');
//calculateInstructions([3,3,1107,-1,8,3,4,3,99],9);
//console.log('Should return 1');
//calculateInstructions([3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9],7);
//console.log('Should return 0');
//calculateInstructions([3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9],0);
//console.log('Should return 1');
//calculateInstructions([3,3,1105,-1,9,1101,0,0,12,4,12,99,1],7);
//console.log('Should return 0');
//calculateInstructions([3,3,1105,-1,9,1101,0,0,12,4,12,99,1],0);
//console.log('Should return 999');
//calculateInstructions([3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
//1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
//999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99],7);
//console.log('Should return 1000');
//calculateInstructions([3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
//1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
//999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99],8);
//console.log('Should return 1001');
//calculateInstructions([3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
//1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
//999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99],9);
//calculateInstructions([1002,4,3,4,33, 99]);
//calculateInstructions([3,0,4,0,99]);
calculateInstructions(data, 5);
//calculateInstructions([1,0,0,0,99]);
//calculateInstructions([2,3,0,3,99]);
//calculateInstructions([2,4,4,5,99,0]);
//calculateInstructions([1,1,1,4,99,5,6,0,99]);
//data[1] = 12;
//data[2] = 2;
//console.log(calculateInstructions(data));
//console.log(getOpcode(4));
//for (let i = 0; i <= 99; i++) {
//  for (let j = 0; j <= 99; j++) {
//    let current = [...data];
//    current[1] = i;
//    current[2] = j;
//    let result = calculateInstructions(current);
//    if (result == 19690720) {
//      console.log(i, j);
//      break;
//    }
//  }
//}
