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

function getPINs(observed) {
  const ADJACENT_BUTTONS = {
    '0': ['0', '8'],
    '1': ['1', '2', '4'],
    '2': ['1', '2', '3', '5'],
    '3': ['2', '3', '6'],
    '4': ['1', '4', '5', '7'],
    '5': ['2', '4', '5', '6', '8'],
    '6': ['3', '5', '6', '9'],
    '7': ['4', '7', '8'],
    '8': ['5', '7', '8', '9', '0'],
    '9': ['6', '8', '9']
  };

  let possiblePINs = [''];
  const observedButtons = observed.split('');
  for (const observedButton of observedButtons) {
    const temp = [];
    for (const adjacentButton of ADJACENT_BUTTONS[observedButton]) {
      for (const possiblePIN of possiblePINs) {
        temp.push(possiblePIN + adjacentButton);
      }
    }
    possiblePINs = temp;
  }
  return possiblePINs;
}

console.log(getPINs('369'));

function justify(text, width) {
  let words = text.split(' ');
  let line = '';
  let justified = '';

  for (let i = 0; i < words.length; i++) {
    if (line.length + words[i].length + 1 > width || i === words.length - 1) {
      if (line.length < width && line.length + words[i].length + 1 > width) {
        line = addSpaces(line, width);
      }
      // add \n then add to final string
      if (line.length + words[i].length + 1 > width) {
        justified += line + '\n';
        line = words[i];
        if (i === words.length - 1) {
          justified += line;
        }
      } else {
        if (line === '') {
          justified += words[i];
        } else {
          line += ' ' + words[i];
          justified += line;
        }
      }
    } else {
      line = `${line} ${words[i]}`.trim();
    }
  }
  return justified;
}

function addSpaces(line, width) {
  let lineArray = line.split(' ');
  let spaces = createSpacesArray(width, line.length, lineArray.length);
  line = '';
  for (let i = 0; i < lineArray.length; i++) {
    line += lineArray[i];
    for (let j = spaces[i]; j > 0; j--) {
      line += ' ';
    }
  }
  return line;
}

function createSpacesArray(width, numOfChars, numOfWords) {
  let difference = width - numOfChars + (numOfWords - 1);
  let divisor = Math.ceil(difference / (numOfWords - 1));
  let spacesArray = [];
  for (let i = 0; i < numOfWords - 1; i++) {
    spacesArray.push(divisor);
  }

  let addedSpaces = divisor * (numOfWords - 1);
  let iterator = numOfWords - 2;

  while (difference < addedSpaces) {
    --spacesArray[iterator];
    --iterator;
    --addedSpaces;
  }
  spacesArray.push(0);
  return spacesArray;
}

const LIPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sagittis dolor mauris, at elementum ligula tempor eget. In quis rhoncus nunc, at aliquet orci. Fusce at dolor sit amet felis suscipit tristique. Nam a imperdiet tellus. Nulla eu vestibulum urna. Vivamus tincidunt suscipit enim, nec ultrices nisi volutpat ac. Maecenas sit amet lacinia arcu, non dictum justo. Donec sed quam vel risus faucibus euismod. Suspendisse rhoncus rhoncus felis at fermentum. Donec lorem magna, ultricies a nunc sit amet, blandit fringilla nunc. In vestibulum velit ac felis rhoncus pellentesque. Mauris at tellus enim. Aliquam eleifend tempus dapibus. Pellentesque commodo, nisi sit amet hendrerit fringilla, ante odio porta lacus, ut elementum justo nulla et dolor.';
console.log(justify(LIPSUM, 30));
