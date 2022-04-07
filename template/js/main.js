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

// TODO: complete this object/class
let collection;
let itemsPerPage;
let pages;

// The constructor takes in an array of items and a integer indicating how many
// items fit within a single page
function PaginationHelper(collection, itemsPerPage){
  this.collection = collection;
  this.itemsPerPage = itemsPerPage;

  this.pages = collection.reduce((array, item, index) => {
    let currentPage = index / itemsPerPage | 0;
    if (array[currentPage] === undefined) {
      array.push([item]);
    } else {
      array[currentPage].push(item);
    }
    return array;
  }, []);
}

// returns the number of items within the entire collection
PaginationHelper.prototype.itemCount = function() {
  return this.collection.length;
}

// returns the number of pages
PaginationHelper.prototype.pageCount = function() {
  return this.pages.length;
}

// returns the number of items on the current page. page_index is zero based.
// this method should return -1 for pageIndex values that are out of range
PaginationHelper.prototype.pageItemCount = function(pageIndex) {
  if (pageIndex > this.pages.length - 1 || pageIndex < 0) {
    return -1;
  } else {
    return this.pages[pageIndex].length;
  }
}

// determines what page an item is on. Zero based indexes
// this method should return -1 for itemIndex values that are out of range
PaginationHelper.prototype.pageIndex = function(itemIndex) {
  if (itemIndex > this.collection.length - 1 || itemIndex < 0) {
    return -1;
  } else {
    return itemIndex / this.itemsPerPage | 0;
  }
}

let example = new PaginationHelper(['a','b','c','d','e','f'], 4);

console.log("item count: " + example.itemCount());
console.log("page count: " + example.pageCount());
console.log("pageItemCount: " + example.pageItemCount(1));
console.log("page index: " + example.pageIndex(5));



function rangeExtractor(list){
  let string = '';

  for (let i = 0; i < list.length; i++) {
    let rangeStart = list[i];
    string += rangeStart;

    for (let j = i + 1; j <= list.length; j++) {
      if (j === list.length || list[j] != rangeStart + j - i) {
        if (j - i >= 3) {
          string += '-' + list[j - 1]; //build range
          i = j - 1;
        }
        break;
      }
    }
    string += ',';
  }
  return string.substring(0, string.length - 1);
}

console.log(rangeExtractor([-6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]));



function add(a, b) {
  let aArray = a.split("");
  let bArray = b.split("");
  let cArray = [];
  let carryOver = 0;

  while(aArray.length > 0 || bArray.length > 0) {

    let aNum = aArray.length > 0 ? Number(aArray.pop()) : 0;
    let bNum = bArray.length > 0 ? Number(bArray.pop()) : 0;
    let cNum = aNum + bNum + carryOver;

    cArray.unshift(cNum % 10);
    carryOver = Math.floor((cNum / 10) % 10);
  }
  if (carryOver) {
    cArray.unshift(carryOver);
  }
  return cArray.join("");
}

console.log(add('63829983432984289347293874', '90938498237058927340892374089'));
