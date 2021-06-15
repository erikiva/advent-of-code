const image = require('./input.txt');
const pixels = image.split('');
//console.log(pixels.length);
const numPixels = 25*6;

let minZeroes = {layer: [], zeroes: 150};
const numLayers = pixels.length / numPixels;
let layers = [];
for (let i = 0; i < numLayers; i++) {
  const current = pixels.splice(0, numPixels);
  layers[i] = current;
  let zeroes = 0;
  for(let j = 0; j < current.length; j++ ){
    if (current[j] == '0'){
      zeroes++;
    }
  }
  if (zeroes < minZeroes.zeroes) {
    minZeroes.layer = i;
    minZeroes.zeroes = zeroes;
  } 
  //console.log(i, ' - ', zeroes);
}
//console.log(minZeroes, pixels.length);

let ones = 0;
let twos = 0;
const layer = layers[minZeroes.layer];
for (let i = 0; i < layer.length; i++){
  if (layer[i] == '1') {
    ones++;
  } else if (layer[i] == '2'){
    twos++;
  }
}


//console.log(layer.join(''))
//console.log(ones, ' - ', twos);
console.log('result is: ', ones*twos);

const calculateColor = () => {
  
}

let decodedImage = [];




for (let pixel = 0; pixel < 150; pixel++) {
  let colorFound = undefined;
  let layer = 0;
  while (!colorFound  && layer < 100){
    console.log('color found: ', colorFound);
    if (layers[layer][pixel] != 2){
      colorFound = layers[layer][pixel];
      decodedImage[pixel] = colorFound == 0 ? '\u2588' : ' ';
      layer++;
    } else {
      layer++;
    }
  }
}

//console.log(decodedImage.join(''));

for (let row = 0; row < 6; row++){
  console.log(decodedImage.slice(row*25, row*25 + 25).join(''));
}


