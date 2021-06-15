// const moons = [
//   new Moon({x:-8, y:-10, z:0},{...initialVelocity}, 'IoPos'),
//   new Moon({x:5, y:5, z:10},{...initialVelocity}, 'Europa'),
//   new Moon({x:2, y:-7, z:3}, {...initialVelocity}, 'Ganymede'),
//   new Moon({x:9, y:-8, z:-3}, {...initialVelocity}, 'Callisto')
// ];

const gcd = (a, b) => {
  if (b == 0) return a;
  return (a > b) ? gcd(b, a%b) : gcd(a, b%a);
}

const lcm = (a, b) => (a * b) / gcd(a, b);

// const initialState = {
//   positions: {
//     x : [-8,5,2,9],
//     y : [-10, 5,-7,-8],
//     z : [0,10,3,-3]
//   },
//   velocities: {
//     x : [0, 0, 0, 0],
//     y : [0, 0, 0, 0],
//     z : [0,0, 0, 0]
//   }
// }

const initialState = {
  positions: {
    x : [-6,12,9,-1],
    y : [2,-14,5,-4],
    z : [-9,-4,-6,9]
  },
  velocities: {
    x : [0, 0, 0, 0],
    y : [0, 0, 0, 0],
    z : [0,0, 0, 0]
  }
}

// const initialState = {
//   positions: {
//     x : [-1,2,4,3],
//     y : [0, -10,-8,5],
//     z : [2,-7,8,-1]
//   },
//   velocities: {
//     x : [0, 0, 0, 0],
//     y : [0, 0, 0, 0],
//     z : [0,0, 0, 0]
//   }
// }

const getUpdatedVelocity = (p, v) => {
  console.log(p.join(''), v.join(''));
  const newVelocities = [...v];
  for (let i = 0; i < p.length; i++){
    for (let j = i + 1; j < p.length; j++){
      if (p[i] < p[j]) {
        newVelocities[i] = newVelocities[i] + 1;
        newVelocities[j] = newVelocities[j] - 1;
      } else if (p[i] > p[j]){
        newVelocities[i] = newVelocities[i] - 1;
        newVelocities[j] = newVelocities[j] + 1;
      }
    }
  }
  return newVelocities;
}

const getUpdatedPositions = (p, v) => {
  let newPositions = [];
  for (let i = 0; i < p.length; i++) {
    newPositions[i] = p[i] + v[i];
  }
  return newPositions;
}

const isInit = (initialp, p, initialv, v) => {
  if (initialp.join('') == p.join('') && initialv.join('') == v.join('')){
    return true;
  }
  return false;
}

const findInitStep = (initialState) => {
  let state = {...initialState};
  let result =  {x:0, y:0, z:0};
  ['x', 'y', 'z'].forEach(coord => {
    let found = false;
    let v = state.velocities[coord];
    let p = state.positions[coord];
    i = 1;
    while(!found){
      v = getUpdatedVelocity(p,v);
      p = getUpdatedPositions(p,v);
      console.log(`Round: ${i} ${coord} p: ${p} v: ${v}`);

      if (isInit(initialState.positions[coord], p, initialState.velocities[coord], v)) {
        result[coord] = i;
        found = true;
      }
      i++;
    }

  });
  console.log( lcm(result.x, lcm(result.y, result.z)));
  console.log(result);
}

findInitStep(initialState);