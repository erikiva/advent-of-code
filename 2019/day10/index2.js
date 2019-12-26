const swipeTest = require('./swipeTest');
const map05 = require('./map05');

const data = require('./input');

const getAsteroids = map => {
  const rows = map.split('\n');
  const space = rows.map(row => row.split(''));
  //console.log(rows.length, rows[0].length, asteroids);
  //console.log(space);
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

const calculateAngle= (x0, y0, x, y) => {
  const dx = x - x0;
  const dy = y - y0;

  const angle = Math.atan2(dx, dy);
  //console.log(`[x0, y0]: [${x0}, ${y0}], [x, y]: [${x}, ${y}] - incline: ${incline} - cuadrant: ${cuadrant} - angle: ${angle}`)
  return angle;
}


const createLines = (station, asteroids) => {
  let lines = {};
  for (let i = 0; i < asteroids.length; i++){
    if (asteroids[i].x !== station.x || asteroids[i].y !== station.y) {
      const angle = calculateAngle(station.x, station.y, asteroids[i].x, asteroids[i].y);
      //console.log({line})
      if (lines[angle]) {
        lines[angle].push(asteroids[i]);
      } else {
        lines[angle] = [asteroids[i]];
      }
    }
  }
  return lines;
}

const distance = (station, asteroid) => {
  const dx = Math.abs(station.x-asteroid.x);
  const dy = Math.abs(station.y-asteroid.y);
  return dx + dy;
}

const orderLine = (line, station) => {
  return line.sort((a, b) => {
    let adist= distance(station, a)
    let bdist = distance(station, b);

    return adist - bdist;
  })
};

const orderAsteroidMap = (linesMap, station) => {
  const angles = Object.keys(linesMap).sort((a,b) => (b - a) );
  const orderedAsteroids = angles.map(angle => {
    return orderLine(linesMap[angle], station);
  })
  return orderedAsteroids;
}





const swipeAsteroids = (map, station, step) => {
  const asteroids = getAsteroids(map);
  const linesMap = createLines(station, asteroids);
  const orderedMap = orderAsteroidMap(linesMap, station);
  let times = 1;
  let i = 0;
  while (times <= step) {
    if (orderedMap[i].length > 0){
      const asteroid = orderedMap[i].shift();
      console.log(times, asteroid);
      times += 1;
    }

    i = i == orderedMap.length - 1 ? 0 : i + 1;
  }

  //console.log(orderedMap);
}


const testSwipe = map => {
  const step = 299;
  const station = { x: 26, y: 29 };
  //console.log(map);
  //test find asteroid blasted at a certain step
  const result = swipeAsteroids(map.map, station, step);
  //console.log('asteroid is :', result );
}

testSwipe(data);

// console.log(distance({x: 8, y:3}, {x: 8, y:0}));
// console.log(distance({x: 8, y:3}, {x: 8, y:1}));

// console.log(orderLine([ { x: 8, y: 0 }, { x: 8, y: 1 } ], {x: 8, y:3}));