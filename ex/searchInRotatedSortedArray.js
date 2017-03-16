/*
Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.

(i.e., 0 1 2 4 5 6 7 might become 4 5 6 7 0 1 2).

You are given a target value to search. If found in the array return its index, otherwise return -1.

You may assume no duplicate exists in the array.
 */

const search = (nums, target) => {
  let lo = 0;
  let hi = nums.length - 1;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (nums[mid] > nums[hi]) lo = mid + 1;
    else hi = mid;
  }

  const rot = lo;
  lo = 0;
  hi = nums.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    const realMid = (mid + rot) % nums.length;
    if (nums[realMid] === target) return realMid;
    if (nums[realMid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
};

