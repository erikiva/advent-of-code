const data = require('./input');

const calculatePosition = (oldCoord, move) => {
  //console.log(oldCoord, move);
  const [direction, distance] = [move.substr(0,1), move.substr(1)];
  let newCoords = [];
  const range = Array(...Array(+distance)).map((_, i) => i+1);
  //console.log(range);
  switch (direction) {
    case 'R':
      newCoords =  range.map(dist => [oldCoord[0] + dist, oldCoord[1]]); 
      break;
    case 'D': 
      newCoords = range.map(dist => [oldCoord[0], oldCoord[1] - dist]);
      break;
    case 'L':
      newCoords = range.map(dist => [oldCoord[0] - dist, oldCoord[1]]); 
      break;
    case 'U':
      newCoords = range.map(dist => [oldCoord[0], oldCoord[1] + dist]);
      break;
  }
  return newCoords;
}

const calculateRoute = moves => {
  const movesArr = moves.split(',');
  const positions = {};
  let previousDistance = 0;
  let previous = [0,0];
  for (let i = 0; i < movesArr.length; i++){
    const newPossitions = calculatePosition(previous, movesArr[i]);
    for (const pos of newPossitions) {
    //console.log('newPossitions: ', newPossitions);
      previousDistance += 1;
      positions[pos.join('_')] = previousDistance;
      previous = pos;
    }
  }
  return positions;
}

const findIntersections = (positions1, cable2) => {
 let bestIntersection = 999999999999;
 let current = [0,0];
 let previousDistance = 0;
 for (let i = 0; i < cable2.length; i++){
  const possitions2 = calculatePosition(current, cable2[i]);

  for (let i = 0; i < possitions2.length; i++){
    previousDistance += 1;
    //console.log('current', current);
    current = possitions2[i];
    if (positions1[current.join('_')] ){
      //console.log(found, current);
      if (positions1[current.join('_')] + previousDistance < bestIntersection) {
        bestIntersection = positions1[current.join('_')] + previousDistance;
      }
    }
  }
 }
  return bestIntersection;
}

const findBestIntersection = (cable1Moves, cable2Moves) => {
  
  const positions1 = calculateRoute(cable1Moves);
  //console.log(positions1);

  const cable2 = cable2Moves.split(',');
  console.log('Intersection point is: ', findIntersections(positions1, cable2));
}

//findBestIntersection('R8,U5,L5,D3', 'U7,R6,D4,L4');
console.log('Result for input data');
findBestIntersection(data[0], data[1]);
findBestIntersection('R75,D30,R83,U83,L12,D49,R71,U7,L72', 'U62,R66,U55,R34,D71,R55,D58,R83');
findBestIntersection('R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51', 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7');
//const coord = calculatePosition([0,0], 'R22');
//const coord2 = calculatePosition(coord, 'U32');
//console.log(coord2);

