function validBraces(b){
  let braces = b;

  for (let i = 0; i < b.length / 2; i++) {
    braces = braces.replace(/\{\}/g, '');
    braces = braces.replace(/\[\]/g, '');
    braces = braces.replace(/\(\)/g, '');
    if (braces.length === 0) {
      return true;
    }
  }
  return false;
}
console.log(validBraces("(({{[[]]}}))"));

const map = new Map();

var fibonacci = function(n) {
  if (n < 2) {
    return n;
  } else if (map.has(n)) {
    return map.get(n);
  } else {
    let x = fibonacci(n - 1) + fibonacci(n - 2);
    map.set(n, x);
    return x;
  }
}

console.log(fibonacci(70));

function add(n){
  var fn = function(x) {
    return add(n + x);
  }

  fn.valueOf = function() {
    return n;
  }

  return fn;
}
