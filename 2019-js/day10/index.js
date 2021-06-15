const map01 = require('./map01');
const map02 = require('./map02');
const map03 = require('./map03');
const map04 = require('./map04');
const map05 = require('./map05');
const data = require('./input');

const getAsteroids = space => {
  const asteroids = [];
  space.forEach((row, y) => {
    row.forEach((point, x) => {
      if (point === '#'){
        asteroids.push({x, y});
      }
    })
  })
  return asteroids;
}

const calculateLine= (x0, y0, x, y) => {
  const dx = x - x0;
  const dy = y - y0;
  const incline = dy / dx;
  const cuadrant = dx >= 0
  ? dy > 0
    ? 1
    : 2
  : dy <= 0
    ? 3
    : 4;
  console.log(`[${x0}, ${y0}], [${x}, ${y}] - (${incline}) - (${cuadrant})`)
  return `${cuadrant}_${incline}`;
}




const calculateConnections = (asteroid,asteroids) => {
  connections = {};
  console.log(`There are ${asteroids.length} asteroids`);
  for (let i = 0; i < asteroids.length; i++){
    if (asteroids[i].x !== asteroid.x || asteroids[i].y !== asteroid.y) {
      const line = calculateLine(asteroid.x, asteroid.y, asteroids[i].x, asteroids[i].y);
      //console.log({line})
      if (connections[line]) {
        connections[line] = connections[line] + 1;
      } else {
        connections[line] = 1;
      }
    }
  }

  return connections;
}


const calculateBestAsteroid = (map)=> {
  console.log(map);
  const rows = map.split('\n');
  const space = rows.map(row => row.split(''));
  const asteroids = getAsteroids(space);
  console.log(rows.length, rows[0].length, asteroids);

  const asteroidsWithConnections = asteroids.map((asteroid, i, asteroids) => {
    const conn = calculateConnections(asteroid, asteroids);
    console.log('Num of connections for ', asteroid, Object.keys(conn).length);
    return {asteroid, conn}
  });
  return asteroidsWithConnections.reduce((max, asteroid) => {
    return Object.keys(asteroid.conn).length > max.conn
      ? {conn:Object.keys(asteroid.conn).length, ast: asteroid}
      : max;
  }, {ast:{}, conn:0})
}

const test = map => {
  //console.log(map);
  const result = calculateBestAsteroid(map.map);
  console.log('best is ', result );
}




//test(map01);
//test(map02);
//test(map03);
//test(map04);
// test(map05);
test(data);

// calculateLine(11,13, 11,12);
// calculateLine(11,13, 12,1);
// calculateLine(11,13, 12,12);
// calculateLine(11,13, 12,8);
// calculateLine(11,13, 16,0);
// calculateLine(11,13, 16,9);
// calculateLine(11,13, 10,16);
// calculateLine(11,13, 9,6);











