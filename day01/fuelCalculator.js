const fs = require('fs');
const readline = require('readline');

const calculateFuel = (mass) => Math.floor(mass/3) -2;
let total = 0;

const calculateFuelsFuel = fuel => {
  if (fuel <= 8) return 0;
  const additionalFuel = calculateFuel(fuel);
  return additionalFuel + calculateFuelsFuel(additionalFuel);
}

async function processLineByLine() {
  const fileStream = fs.createReadStream('input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break
  for await (const line of rl) {
    const value = parseInt(line.trim(),10);
    const fuel = calculateFuel(value);
    total += fuel + calculateFuelsFuel(fuel);
    // Each line in input.txt will be successively available here as `line`.
  }
}

processLineByLine();
