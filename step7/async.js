function repeat(count, callback) {
  for (let i = 0; i < count; ++i) {
    callback(i);
  }
}

repeat(3, function(i) {
  console.log(`数字は${i}です`); // [1]
});

repeat(4, function(i) {
  console.log(`[${i}]`); // [2]
});

