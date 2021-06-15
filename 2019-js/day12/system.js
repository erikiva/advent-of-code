const {Moon} = require('./moon');
// IoPos <x=-6, y=2, z=-9}
// Europa <x=12, y=-14, z=-4>
// Ganymede <x=9, y=5, z=-6>
// Callisto <x=-1, y=-4, z=9>

const initialVelocity = {x: 0, y: 0, z:0};

// const moons = [
//   new Moon({x:-6, y:2, z:-9},{...initialVelocity}, 'IoPos'),
//   new Moon({x:12, y:-14, z:-4},{...initialVelocity}, 'Europa'),
//   new Moon({x:9, y:5, z:-6}, {...initialVelocity}, 'Ganymede'),
//   new Moon({x:-1, y:-4, z:9}, {...initialVelocity}, 'Callisto')
// ];

// const moons = [
//   new Moon({x:-1, y:0, z:2},{...initialVelocity}, 'IoPos'),
//   new Moon({x:2, y:-10, z:-7},{...initialVelocity}, 'Europa'),
//   new Moon({x:4, y:-8, z:8}, {...initialVelocity}, 'Ganymede'),
//   new Moon({x:3, y:5, z:-1}, {...initialVelocity}, 'Callisto')
// ];

const moons = [
  new Moon({x:-8, y:-10, z:0},{...initialVelocity}, 'IoPos'),
  new Moon({x:5, y:5, z:10},{...initialVelocity}, 'Europa'),
  new Moon({x:2, y:-7, z:3}, {...initialVelocity}, 'Ganymede'),
  new Moon({x:9, y:-8, z:-3}, {...initialVelocity}, 'Callisto')
];

class System {
  constructor(moons){
    this.moons = moons;
    this.totalEnergy = 0;
    this.initialState = this.getState();
    this.states = {};
  }
  updateMoonsState(){
    for (let i = 0; i < this.moons.length; i++){
      for (let j = i + 1; j < this.moons.length; j++){
        this.moons[i].updateVelocity(this.moons[j]);
        this.moons[j].updateVelocity(this.moons[i]);
      }
    }
    for (let i = 0; i < this.moons.length; i++){
        this.moons[i].updatePosition();
    }
  }
  updateEnergy(){
    let pot = 0;
    for (let i = 0; i < this.moons.length; i++){
      tot += (this.moons[i].getPotentialEnergy() * this.moons[i].getKineticEnergy())
    }
    this.potencialEnergy = pot;
  }
  updateSystem(n){
    this.printState(0);
    console.log(this.initialState);
    for (let i = 1; i <= n; i++){
      this.updateMoonsState();
      this.updateEnergy();
      const newState = this.getState();
      if (this.states[newState]){
        break;
      } else {
        this.states[newState] = 1;
      }
      this.printState(i);
    }
  }
  updateSystemUntilRepeat(){
    let i = 0;
    let found = false;
    console.log(this.getState());
    while(!found  && i < 686774926) {
      this.updateMoonsState();
      //this.updateEnergy();
      const newState = this.getState();
      if (newState == this.initialState) {
        found = true;
      }
      //found = true;
      i++;
    }
    console.log(`After ${i} steps: ${this.initialState}`);
  }
  getState(){
    let state = '';
    this.moons.forEach(moon => {
      state += moon.getVelocityState();
    });
    return state;
  }
  printState(step){
    console.log(`After ${step} steps:`);
    // moons.forEach(moon => {
    //   console.log(`    pos=<x=${moon.position.x}, y=${moon.position.y}, z=${moon.position.z}>, vel=<x=${moon.velocity.x}, y=${moon.velocity.y}, z=${moon.velocity.z}>`);
    //   console.log(`        pot: ${moon.getPotentialEnergy()};   kin: ${moon.getKineticEnergy()};   total:${moon.getPotentialEnergy() * moon.getKineticEnergy()}`);
    // })
    // console.log(`Total energy for the system is : ${this.totalEnergy}`);
    // console.log('');
  }
}

const system = new System([...moons]);
//system.updateSystem(2800);
system.updateSystemUntilRepeat();

// const io = new Moon({x:-6, y:2, z:-9},{ x: -1, y: 1, z: -1 }, 'IoPos');
// const europa =   new Moon({x:12, y:-14, z:-4},initialVelocity, 'Europa');

// io.updatePosition();
// console.log(io.position);
// io.updatePosition();
// console.log(io.position);
// io.updatePosition();
// console.log(io.position);
// io.updatePosition();
// console.log(io.position);

// io.updateVelocity(europa);
// console.log(io.velocity, io.position);
// europa.updateVelocity(io);
// console.log(europa.velocity, europa.position);
// io.updateVelocity(europa);
// console.log(io.velocity, io.position);
// europa.updateVelocity(io);
// console.log(europa.velocity, europa.position);