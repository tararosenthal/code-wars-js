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
