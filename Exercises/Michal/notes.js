const three = [1, 2, 3];
const doubled = three.map((number) => number * 2);
console.log(doubled);
//above is the same as

const three = [1, 2, 3];
const doubled = three.map(function (item) {
  return item * 2;
});
