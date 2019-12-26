const start = 307237;
const end = 769058;

const getNumList = num => {
  return num.toString().split('').map(letter => parseInt(letter));
}

const hasDouble = nums => {
  let i = 0;
  while ( i < nums.length){
    if ((nums[i] === nums[i+1])){
      let j = i+2;
      while ((j <= nums.length - 1)  &&  (nums[i] === nums[j]) ){
        j++;
      }
      if (i+2 == j){
        return true;
      } else {
        i = j;
      }
    } else {
      i++;
    }
  }
  return false;
}

const hasDecreasing = nums => {
  for (let i = 0; i < nums.length - 1; i++ ){
    if (nums[i] > nums[i+1]){
      return true;
    }
  }
  return false;
}
let counter = 0;
for (let i = start; i < end; i++) {
  let numArray = getNumList(i);
  if (hasDouble(numArray) && !hasDecreasing(numArray)) {
    counter++;
  }
}
console.log('Total number is : ', counter);


console.log(hasDouble([1,1,2,2,3,3]));
console.log(hasDouble([1,2,3,4,4,4]));
console.log(hasDouble([1,2,3,4,4,4,5]));
console.log(hasDouble([1,1,1,1,2,2]));
