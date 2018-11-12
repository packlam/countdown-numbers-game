const countdown = (numbers, target, total = {result: 0, method: []}) => {
  const randomOperation = (x, y, total) => {
    let rand = Math.floor(Math.random() * 4) + 1;
    switch (rand) {
      case 1:
        total.result = x + y;
        total.method.push(`${x} + ${y} = ${x + y}`);
        return total;
      case 2:
        if (x - y > 0) {
          total.result = x - y;
          total.method.push(`${x} - ${y} = ${x - y}`);
          return total;
        } else {
          return randomOperation(x, y, total);
        }
      case 3:
        if (x > 1 && y > 1) {
          total.result = x * y;
          total.method.push(`${x} * ${y} = ${x * y}`);
          return total;
        } else {
          return randomOperation(x, y, total);
        }
      case 4:
        if (x > 1 && y > 1 && x % y === 0) {
          total.result = x / y;
          total.method.push(`${x} / ${y} = ${x / y}`);
          return total;
        } else {
          return randomOperation(x, y, total);
        }
    }
  };

  // Fisher-Yates shuffle algorithm
  const shuffle = arr => {
    let currentIndex = arr.length;
    let tempValue, randomIndex;
  
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      tempValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = tempValue;
    }
    return arr;
  };

  // base case
  if (total.result === target) {
    return total;
  } else if (numbers.length === 1) {
    return randomOperation(total.result, numbers[0], total);
  }

  // initialise (total.result should only ever equal zero on the first run)
  if (total.result === 0) {
    shuffle(numbers);
    const x = numbers.shift();
    const y = numbers.shift();
    total = randomOperation(x, y, total);
    if (total.result === target) return total;
  }

  // recursive case
  const x = numbers.shift();
  total = randomOperation(total.result, x, total);
  return countdown(numbers, target, total);
};

for (let i = 0; i < 1000000; i++) {
  const target = 555;
  const numbers = [100, 75, 50, 25, 8, 9];
  const output = countdown(numbers, target);
  if (output.result === target) {
    console.log(output);
    console.log(`Number of loops: ${i}`);
    break;
  }
}

// // hardest game!
// for (let i = 0; i < 100000; i++) {
//   const target = 952;
//   const numbers = [25, 50, 75, 100, 3, 6];
//   const output = countdown(numbers, target);
//   if (output.result === target) {
//     console.log(output);
//     console.log(`Number of loops: ${i}`);
//     break;
//   }
// }