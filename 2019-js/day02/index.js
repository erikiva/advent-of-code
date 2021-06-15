const data = require('./input.js') 
 
 const calculateInstructions = instructions => {
    //console.log(instructions); 
    let index = 0;
    while (true) {
      if (index == instructions.length || instructions[index] == 99) break;
      if (instructions[index] == 1){
        instructions[instructions[index + 3]] = instructions[instructions[index + 1]] + instructions[instructions[index + 2]];
        index = index + 4;
      }
      if (instructions[index] == 2){
        instructions[instructions[index + 3]] = instructions[instructions[index + 1]] * instructions[instructions[index + 2]];
        index = index + 4;
      }
    }
    //console.log('final instructions', instructions);
    return instructions[0];
}

calculateInstructions([1,0,0,0,99]);
calculateInstructions([2,3,0,3,99]);
calculateInstructions([2,4,4,5,99,0]);
calculateInstructions([1,1,1,4,99,5,6,0,99]);
//data[1] = 12;
//data[2] = 2;
//console.log(calculateInstructions(data));

for (let i = 0; i <= 99; i++) {
  for (let j = 0; j <= 99; j++) {
    let current = [...data];
    current[1] = i;
    current[2] = j;
    let result = calculateInstructions(current);
    if (result == 19690720) {
      console.log(i, j);
      break;
    }
  }
}
