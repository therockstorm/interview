/*
const sortNums = (a, b) => a - b;

var threeSum = function(nums) {
    const result = [];
    nums.sort(sortNums);

    for (let i = 0; i < nums.length - 2; i++) {
        if (i !== 0 && nums[i] === nums[i - 1]) continue; // duplicates
        let lo = i + 1;
        let hi = nums.length - 1;
        const target = -nums[i];
        while (lo < hi) {
            if (nums[lo] + nums[hi] === target) {
                result.push([nums[i], nums[lo], nums[hi]]);
                while (lo < hi && nums[lo] == nums[lo+1]) lo++; // duplicates
                while (lo < hi && nums[hi] == nums[hi-1]) hi--; // duplicates
                lo++; hi--;
            } else if (nums[lo] + nums[hi] < target) lo++;
            else hi--;
        }
    }

    return result;
};
*/

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
