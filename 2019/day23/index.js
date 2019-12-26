const { Computer } = require("./computer");
const data = require("./input");

function network(instructions) {
  let natPacket = [];
  let lastY;
  const computers = new Array(50)
    .fill()
    .map((_, i) => new Computer([...instructions], [i]));
  let status;
  let allRead = false;
  while (status != "stop") {
    for (let i = 0; i < computers.length; i++) {
      let instructions = [];

      status = computers[i].calculateInstructions();
      if (status == "read") {
        continue;
      }
      allRead = false;
      instructions.push(computers[i].getOutput());
      status = computers[i].calculateInstructions();
      instructions.push(computers[i].getOutput());
      status = computers[i].calculateInstructions();
      instructions.push(computers[i].getOutput());
      console.log(i, instructions);
      if (instructions[0] >= 0 && instructions[0] <= 49) {
        computers[instructions[0]].addInputArray([
          instructions[1],
          instructions[2]
        ]);
      } else if (instructions[0] == 255) {
        natPacket = [instructions[1], instructions[2]];
      }

      // computers[instructions[0]].calculateInstructions();
      // console.log(instructions[0], computers[instructions[0]].getOutput());
      // status.push(computers[i].calculateInstructions());
    }
    if (allRead == true && natPacket.length > 0) {
      console.log("idle, sending: ", natPacket);
      if (lastY == natPacket[1]) {
        return lastY;
      } else {
        lastY = natPacket[1];
      }
      computers[0].addInputArray([natPacket[0], natPacket[1]]);
    }
    allRead = true;
  }
}

const yVal = network(data);
console.log(yVal);
