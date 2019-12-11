const { Computer } = require('./computer');
const data = require('./input')

const U = 'U';
const D = 'D';
const L = 'L';
const R = 'R';

const WHITE = 'W';
const BLACK = 'B';

class Panel {
  constructor(initialPos, initialDir){
    this.position = initialPos;
    this.direction = initialDir;
    this.panel = {};
  }
  turn (input) {
    let  newDirection;
    switch (`${this.direction}${input}`) {
      case 'U0':
        newDirection = L;
        break;
      case 'U1':
        newDirection = R;
        break;
      case 'D0':
          newDirection = R;
          break;
      case 'D1':
        newDirection = L;
        break;
      case 'L0':
        newDirection = D;
        break;
      case 'L1':
        newDirection = U;
        break;
      case 'R0':
        newDirection = U;
        break;
      case 'R1':
        newDirection = D;
        break;
    }
    this.direction = newDirection;
    return newDirection;
  }
  move() {
    const directions = {
      U: [0,1],
      D: [0, -1],
      L: [-1,0],
      R: [1,0]
    }
    const change = directions[this.direction];
    const newPosition = [this.position[0] + change[0], this.position[1] + change[1]];
    console.log(`New position is: ${newPosition} direction: ${this.direction}`);
    this.position = newPosition;
  }
  paint(color) {
    this.panel[this.position] = color == 0 ? BLACK : WHITE;
  }

  getColor(){
    const color = this.panel[this.position];
    return color == WHITE ? 1 : 0;
  }

  getPanelDimensions(){
    const dimensions = Object.keys(this.panel).reduce(
      (dimen, panel) => {
        const pos = panel.split(',');
        const x = parseInt(pos[0]);
        const y = parseInt(pos[1]);
        if (x > dimen.maxX){
          dimen.maxX = x;
        } else if (x < dimen.minX) {
          dimen.minX = x;
        }
        if (y > dimen.maxY){
          dimen.maxY = y;
        } else if (y < dimen.minY) {
          dimen.minY = y;
        }
        return dimen;
      }, {maxX: -Infinity, maxY: -Infinity, minX: Infinity, minY: Infinity}
    )
    console.log({dimensions});
    return dimensions;
  }

  drawPanel(){
    const dim = this.getPanelDimensions();
    //${Math.abs(dim.maxX) + Math.abs(dim.minX)} height: ${Math.abs(dim.maxY) + Math.abs(dim.minY)}
    const width = Math.abs(dim.maxX) + Math.abs(dim.minX);
    const height = Math.abs(dim.maxY) + Math.abs(dim.minY);
    const panel = Array(height + 2).fill([]).map(i => Array(width + 2).fill(' '));
    const coords = Object.keys(this.panel);
    for (let i = 0; i < coords.length; i++){
      const xy = coords[i].split(',');
      const x = Math.abs(dim.minX) + parseInt(xy[0]);
      const y = dim.maxY - parseInt(xy[1]);
      console.log('coord switch', xy, ' - ',x,' - ',y);
      panel[y][x] = this.panel[coords[i]] == WHITE ? '\u2588' : ' ';
    }
    panel.forEach(row => {
      console.log(row.join(''));
    })

  }

}



function paint(initialInput){
  // initialize everything
    const panel = new Panel([0,0], 'U');
    let currentColor = initialInput ? initialInput : [panel.getColor()];
    let inputs = [1];
    const brain =  new Computer(data, inputs);
    let resume = true;
    let step = 'paint';
    while (resume) {
      resume = brain.calculateInstructions();
      if (step == 'paint'){
        const color = brain.output;
        panel.paint(color);
        step = 'move';
      } else if (step == 'move') {
        const direction = brain.output;
        panel.turn(direction);
        panel.move();
        const newColor = panel.getColor();
        inputs.push(newColor);
        step = 'paint';
      }
    }
    console.log(`Number of positions painted: ${Object.keys(panel.panel).length}`)
    panel.drawPanel();
    //console.log(`The panel dimensions are width: ${Math.abs(dim.maxX) + Math.abs(dim.minX)} height: ${Math.abs(dim.maxY) + Math.abs(dim.minY)}`)
    //console.log(dim);
  }


// Part 1
paint();

// Part 2
paint(1);



const test1 = () => {
  const panel = new Panel([0,0], 'U');
  const color = panel.getColor();
  console.log('Initial Color = ', color);
  panel.paint(1); // paint white
  panel.turn(0);
  panel.move(1);
  console.log('Color at new position: ', panel.position, panel.getColor());
  console.log(panel.panel);
  panel.paint(0);
  panel.turn(0);
  panel.move(1);
  console.log('Color at new position: ', panel.position, panel.getColor());
  console.log(panel.panel);
  panel.paint(1); // paint white
  panel.turn(0);
  panel.move(1);
  console.log('Color at new position: ', panel.position, panel.getColor());
  console.log(panel.panel);
  panel.paint(1);
  panel.turn(0);
  panel.move(1);
  console.log('Color at new position: ', panel.position, panel.getColor());
  console.log(panel.panel);
  panel.paint(0);
  panel.turn(1);
  panel.move(1);
  console.log('Color at new position: ', panel.position, panel.getColor());
  console.log(panel.panel);
  panel.paint(1);
  panel.turn(0);
  panel.move(1);
  console.log('Color at new position: ', panel.position, panel.getColor());
  console.log(panel.panel);
  panel.paint(1);
  panel.turn(0);
  panel.move(1);
  console.log('Color at new position: ', panel.position, panel.getColor());
  console.log(panel.panel);
}

//test1();



module.exports = {
  Panel
};