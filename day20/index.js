const data = require("./input");
const test1 = `
         A
         A
  #######.#########
  #######.........#
  #######.#######.#
  #######.#######.#
  #######.#######.#
  #####  B    ###.#
BC...##  C    ###.#
  ##.##       ###.#
  ##...DE  F  ###.#
  #####    G  ###.#
  #########.#####.#
DE..#######...###.#
  #.#########.###.#
FG..#########.....#
  ###########.#####
             Z
             Z       `;

const test2 = `
             Z L X W       C
             Z P Q B       K
  ###########.#.#.#.#######.###############
  #...#.......#.#.......#.#.......#.#.#...#
  ###.#.#.#.#.#.#.#.###.#.#.#######.#.#.###
  #.#...#.#.#...#.#.#...#...#...#.#.......#
  #.###.#######.###.###.#.###.###.#.#######
  #...#.......#.#...#...#.............#...#
  #.#########.#######.#.#######.#######.###
  #...#.#    F       R I       Z    #.#.#.#
  #.###.#    D       E C       H    #.#.#.#
  #.#...#                           #...#.#
  #.###.#                           #.###.#
  #.#....OA                       WB..#.#..ZH
  #.###.#                           #.#.#.#
CJ......#                           #.....#
  #######                           #######
  #.#....CK                         #......IC
  #.###.#                           #.###.#
  #.....#                           #...#.#
  ###.###                           #.#.#.#
XF....#.#                         RF..#.#.#
  #####.#                           #######
  #......CJ                       NM..#...#
  ###.#.#                           #.###.#
RE....#.#                           #......RF
  ###.###        X   X       L      #.#.#.#
  #.....#        F   Q       P      #.#.#.#
  ###.###########.###.#######.#########.###
  #.....#...#.....#.......#...#.....#.#...#
  #####.#.###.#######.#######.###.###.#.#.#
  #.......#.......#.#.#.#.#...#...#...#.#.#
  #####.###.#####.#.#.#.#.###.###.#.###.###
  #.......#.....#.#...#...............#...#
  #############.#.#.###.###################
               A O F   N
               A A D   M`;

const key = arr => arr.join("_");

class Maze {
  constructor(data) {
    this.maze = this.readMaze(data);
    this.gates = {};
    this.gateMap = {};
  }
  readMaze(data) {
    let maze = data.split("\n").map(row => {
      return row.split("");
    });

    return maze;
  }
  isLetter(char) {
    return char >= "A" && char <= "Z";
  }
  addGate(name, position) {
    if (this.gates[name]) {
      this.gates[name].push(position);
    } else {
      this.gates[name] = [position];
    }
  }
  getGatePos([col, row]) {
    if (this.maze[row + 2] && this.maze[row + 2][col] == ".") {
      return [col, row + 2];
    }
    if (this.maze[row][col + 2] == ".") {
      return [col + 2, row];
    }
    if (this.maze[row - 1] && this.maze[row - 1][col] == ".") {
      return [col, row - 1];
    }
    if (this.maze[row][col - 1] == ".") {
      return [col - 1, row];
    }
  }
  findGates() {
    for (let row = 0; row < this.maze.length; row++) {
      for (let col = 0; col < this.maze[row].length; col++) {
        if (this.isLetter(this.maze[row][col])) {
          const first = this.maze[row][col];
          let second;
          if (this.maze[row + 1] && this.isLetter(this.maze[row + 1][col])) {
            second = this.maze[row + 1][col];
          } else if (this.isLetter(this.maze[row][col + 1])) {
            second = this.maze[row][col + 1];
          }
          if (second) {
            const gate = first + second;
            //console.log(gate);
            const pos = this.getGatePos([col, row]);
            this.addGate(gate, pos);
          }
        }
      }
    }
  }
  getGateType([col, row]) {
    const maxX = this.maze[3].length;
    if (
      row == 3 ||
      row >= this.maze.length - 4 ||
      col >= maxX - 3 ||
      col == 2
    ) {
      return "ext";
    }
    return "int";
  }
  createGateMap() {
    Object.keys(this.gates).forEach(gate => {
      if (this.gates[gate].length > 1) {
        this.gateMap[key(this.gates[gate][0])] = {
          name: gate,
          type: this.getGateType(this.gates[gate][0]),
          conn: this.gates[gate][1]
        };
        this.gateMap[key(this.gates[gate][1])] = {
          name: gate,
          type: this.getGateType(this.gates[gate][1]),
          conn: this.gates[gate][0]
        };
      }
    });
  }
  getElement(col, row) {
    return this.maze[row][col];
  }
  getNeighbours([col, row]) {
    let neighbours = [];
    const gate = this.gateMap[key([col, row])];
    if (gate) {
      neighbours.push(gate.conn);
    }
    if (this.getElement(col - 1, row) == ".") {
      neighbours.push([col - 1, row]);
    }
    if (this.getElement(col + 1, row) == ".") {
      neighbours.push([col + 1, row]);
    }
    if (this.getElement(col, row - 1) == ".") {
      neighbours.push([col, row - 1]);
    }
    if (this.getElement(col, row + 1) == ".") {
      neighbours.push([col, row + 1]);
    }
    return neighbours;
  }
  get3DNeighbours([col, row, level]) {
    let neighbours = [];
    const gate = this.gateMap[key([col, row])];
    if (gate) {
      if (level == 0 && gate.type == "int") {
        neighbours.push([...gate.conn, level + 1]);
      } else if (level > 0) {
        if (gate.type == "int") {
          neighbours.push([...gate.conn, level + 1]);
        } else {
          neighbours.push([...gate.conn, level - 1]);
        }
      }
    }
    if (this.getElement(col - 1, row) == ".") {
      neighbours.push([col - 1, row, level]);
    }
    if (this.getElement(col + 1, row) == ".") {
      neighbours.push([col + 1, row, level]);
    }
    if (this.getElement(col, row - 1) == ".") {
      neighbours.push([col, row - 1, level]);
    }
    if (this.getElement(col, row + 1) == ".") {
      neighbours.push([col, row + 1, level]);
    }
    return neighbours;
  }
  find3DPath() {
    let nodeQueue = [];
    let visited = {};
    let pathSteps = {};
    let path = {};
    const initial = [...this.gates["AA"][0], 0];
    const end = [...this.gates["ZZ"][0], 0];
    nodeQueue.push(initial);
    visited[key(initial)] = true;
    pathSteps[key(initial)] = 0;
    path[key(initial)] = [];

    //console.log(nodeQueue, visited);
    while (nodeQueue.length > 0) {
      const current = nodeQueue.shift();
      //console.log({ current });
      if (key(current) == key(end)) {
        console.log("found", pathSteps[key(end)]);
        //console.log(path[key(current)]);
        return;
        //console.log({ pathSteps });
      } else {
        const neighbours = this.get3DNeighbours(current);
        //console.log({ neighbours });
        neighbours.forEach(neighbour => {
          if (!visited[key(neighbour)]) {
            nodeQueue.push(neighbour);
            visited[key(neighbour)] = true;
            pathSteps[key(neighbour)] = pathSteps[key(current)] + 1;
            const gate = this.gateMap[key([neighbour[0], neighbour[1]])];
            if (gate) {
              path[key(neighbour)] = [
                ...path[key(current)],
                [...neighbour, gate.name]
              ];
            } else {
              path[key(neighbour)] = path[key(current)];
            }
          }
        });
      }
    }
  }
  findPath() {
    let level = 0;
    let nodeQueue = [];
    let visited = {};
    let pathSteps = {};
    const initial = this.gates["AA"][0];
    const end = this.gates["ZZ"][0];
    nodeQueue.push(initial);
    visited[key(initial)] = true;
    pathSteps[key(initial)] = 0;

    //console.log(nodeQueue, visited);
    while (nodeQueue.length > 0) {
      const current = nodeQueue.shift();
      if (key(current) == key(end)) {
        console.log("found", pathSteps[key(end)]);
        //console.log({ pathSteps });
      } else {
        const neighbours = this.getNeighbours(current);
        //console.log({ neighbours });
        neighbours.forEach(neighbour => {
          if (!visited[key(neighbour)]) {
            nodeQueue.push(neighbour);
            visited[key(neighbour)] = true;
            pathSteps[key(neighbour)] = pathSteps[key(current)] + 1;
          }
        });
      }
    }
  }
}

const maze = new Maze(data);
maze.findGates();
maze.createGateMap();
maze.find3DPath();
//console.log(maze.maze);
// console.log(maze.gates);
// console.log(maze.gateMap);

// console.log(maze);
// maze.forEach(element => {
//   console.log(element.join(""));
// });
