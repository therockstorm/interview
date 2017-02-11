const run = (input) => {
  // input.sort();
  const results = new Set();
  const map = new Map();

  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      const sum = input[i] + input[j];
      map.set(sum, [input[i], input[j]]);
    }
  }

  for (const [k, v] of map) {
    for (let i = 0; i < input.length; i++) {
      if (k === -input[i]) {
        v.push(input[i]);
        v.sort();
        results.add(v.toString());
      }
    }
  }

  // for (const [k, v] of map) {
  //   if (k > 0) {
  //     for (let i = 0; i < input.length; i++) {
  //       if (k === -input[i]) {
  //         v.push(input[i]);
  //         results.push(v);
  //       } else if (k + input[i] > 0) break;
  //     }
  //   } else {
  //     for (let i = input.length - 1; i >= 0; i--) {
  //       if (k === -input[i]) {
  //         v.push(input[i]);
  //         results.push(v);
  //       } else if (k + input[i] < 0) break;
  //     }
  //   }
  // }

  console.log(results);
};

run([-2, 9, 0, -9, 3, 2, -5, 4]);
//-9, -5, -2, 0, 2, 3, 4, 9
