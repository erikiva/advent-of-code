const { Computer } = require("./computer");
const data = require("./input");

function stringToAscii(str) {
  return str.split("").map(char => char.charCodeAt(0));
}

function getRoom(line) {
  let room = {};
  const [name, details] = line.split("\n", 2);
  room.name = name;
  room.details = details;
  return room;
}

function getList(line) {
  let list = [];
  const listLines = line.split("\n");
  for (let i = 1; i < listLines.length; i++) {
    list.push(listLines[i].slice(2));
  }
  return list;
}

function processInstructions(buffer) {
  let sections = buffer.trim().split("\n\n");
  if (sections[0] == "") {
    sections.shift();
  }
  let room = getRoom(sections[0]);
  room.doors = getList(sections[1]);
  if (sections[2].indexOf("Items") != -1) {
    room.items = getList(sections[2]);
  } else {
    room.items = [];
  }
  // console.log({ room });
  return room;
}

function findPassword(droid) {}

function reverse(direction) {
  switch (direction) {
    case "north":
      return "south";
    case "east":
      return "west";
    case "south":
      return "north";
    case "west":
      return "east";
  }
}

function canUseDoor(room, door) {
  if (room.name == "== Security Checkpoint ==" && door == "north") {
    return false;
  }
  return true;
}

function canTakeItem(item) {
  // return item == "fixed point";
  return ![
    "infinite loop",
    "giant electromagnet",
    "escape pod",
    "photons",
    "molten lava"
  ].includes(item);
}

function dfs(droid) {
  let visited = {};
  let paths = {};

  const explore = (droid, path) => {
    let resume = droid.calculateInstructions();
    // console.log(resume);
    if (resume == "write") {
      let buffer = readDroid(droid);
      // console.log(buffer);
      let room = processInstructions(buffer);
      console.log(room.name, room.doors, room.items);
      if (visited[room.name]) {
        return;
      } else {
        paths[room.name] = path;
        visited[room.name] = true;
      }

      room.items.forEach(item => {
        if (!canTakeItem(item)) {
          return;
        }
        writeDroid(droid, `take ${item}\n`);
        let buffer = readDroid(droid);
        console.log(buffer);
      });

      // console.log(room.name);
      room.doors.forEach(door => {
        if (!canUseDoor(room, door)) {
          return;
        }
        writeDroid(droid, door + "\n");
        explore(droid, [...path, door]);
        writeDroid(droid, reverse(door) + "\n");
        let buffer = readDroid(droid);
        let newRoom = processInstructions(buffer);
        console.log("Returned to", newRoom.name);
      });
    }
  };

  explore(droid, []);

  // console.log("------------");
  return paths;
}

function writeDroid(droid, command) {
  console.log("Sending", { command });
  droid.addInputArray(stringToAscii(command));
  return droid.calculateInstructions();
}

function readDroid(droid) {
  let buffer = "";
  while (droid.status == "write") {
    buffer += String.fromCharCode(droid.getOutput());
    droid.calculateInstructions();
  }
  return buffer;
}

function tryEntering(droid) {
  writeDroid(droid, "north\n");
  let buffer = readDroid(droid);
  if (buffer.includes("heavier")) {
    return 1;
  } else if (buffer.includes("lighter")) {
    return -1;
  }
  console.log(buffer);
  return 0;
}

function tryDroppingOne(droid, inventory) {
  for (let i = 0; i < inventory.length; i++) {
    writeDroid(droid, `drop ${item}\n`);
    readDroid(droid);
    writeDroid(droid, `take ${item}\n`);
    readDroid(droid);
  }
}

function tryDroppingOne(droid, inventory) {
  for (let i = 0; i < inventory.length; i++) {
    for (let j = 0; j < i; j++) {
      for (let k = 0; k < j; k++) {
        for (let l = 0; l < k; l++) {
          item = inventory[i];
          item2 = inventory[j];
          item3 = inventory[k];
          item4 = inventory[l];

          writeDroid(
            droid,
            `drop ${item}\ndrop ${item2}\ndrop ${item3}\ndrop ${item4}\n`
          );
          readDroid(droid);

          status = tryEntering(droid);
          if (status == 0) {
            return;
          }
          console.log(status);

          writeDroid(
            droid,
            `take ${item}\ntake ${item2}\ntake ${item3}\ntake ${item4}\n`
          );
          readDroid(droid);
        }
      }
    }
  }
}

function main(data) {
  let buffer;
  const droid = new Computer(data, stringToAscii(``));

  let paths = dfs(droid);

  // go to security checkpoint
  let securityCheckpointCommand = paths["== Security Checkpoint =="];
  writeDroid(droid, securityCheckpointCommand.join("\n") + "\n");
  buffer = readDroid(droid);

  let inventory = [
    "food ration",
    "fixed point",
    "semiconductor",
    "coin",
    "pointer",
    "klein bottle",
    "planetoid",
    "weather machine"
  ];

  tryDroppingOne(droid, inventory);

  // writeDroid(droid, "inv\n");
  // console.log(readDroid(droid));
  return;

  let resume;
  // let stop = 0;
  let roomsVisited = {};
  while (resume != "stop") {
    resume = droid.calculateInstructions();
    buffer = readDroid(droid);
    if (droid.status == "read") {
      console.log({ buffer });
      // if (stop == 1) {
      //   droid.addInputArray(stringToAscii(`west\n`));
      // }
      // if (stop == 2) {
      //   droid.addInputArray(stringToAscii(`take semiconductor\nwest\n`));
      // }
      resume = droid.calculateInstructions();
      // if (stop == 3) {
      //   break;
      // }
      // stop++;
    }
    const sections = buffer.length > 10 ? processInstructions(buffer) : [];
    console.log(sections.length, sections);
    // sections.forEach(part => {
    //   console.log(part);
    // });

    // process.stdout.write(String.fromCharCode(droid.getOutput()));
    break;
  }
  //console.log(droid.getOutput());
}

main(data);
