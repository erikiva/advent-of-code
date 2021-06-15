const fs = require('fs');
const readline = require('readline');

const countOrbits = orbitGraph  => {
  //const orbitGraph = getOrbits(data);
  //console.log(orbitGraph);
  let orbitCounter = {};
  let totalOrbits = 0;
  for (const planet in orbitGraph) {
    let center = orbitGraph[planet];
    let planetCounter = 0;
    let next;
    while (center) {
      planetCounter++;
      if (orbitCounter[center]){
        orbitCounter[planet] = orbitCounter[center] + planetCounter;
        totalOrbits += orbitCounter[planet];
        break;
      }
      //next = center;
      center = orbitGraph[center];
    }
    if (!orbitCounter[planet]) {
      orbitCounter[planet] = planetCounter;
      totalOrbits += planetCounter;
    }
  }  
  console.log('orbitCounter: ', orbitCounter);
  console.log('totalOrbits: ', totalOrbits);
  return totalOrbits;
}

const findPathLength = (san, you, orbitGraph) => {
  let path1 = {};
  let pathLength = 0;
  let next = orbitGraph[san];
  while(next) {
    path1[next] = pathLength;
    next = orbitGraph[next];
    pathLength++;
  }
  console.log(path1);
  pathLength = 0;
  next = orbitGraph[you];
  while(next) {
    if (path1[next]) {
      pathLength = pathLength + path1[next];
      break;
    } 
    next = orbitGraph[next];
    pathLength++;
  }
  console.log('distance to santa: ', pathLength);
  return pathLength;
}

async function processLineByLine(file) {
  const fileStream = fs.createReadStream(file);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break
  let orbits = {};
  for await (const line of rl) {
    const [a,b] = line.split(')');
    orbits[b] = a;
  }

  const count = countOrbits(orbits);
  const pathLength = findPathLength('SAN', 'YOU', orbits);
  //return orbits;

}


//processLineByLine('sample.txt');
processLineByLine('input.txt');

