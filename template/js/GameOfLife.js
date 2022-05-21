function getGeneration(cellsOriginal, generations){
  //copy array
  let cells = JSON.parse(JSON.stringify(cellsOriginal));

  for (let i = 0; i < generations; i++) {
  // create expanded cells
    expand(cells);

  // get neighbors
    const neighbors = getNeighbors(cells);

  // fill nexgen cells
    cells = getNextgen(cells, neighbors);
  }

 // return cropped final
  return crop(cells);
}

function expand(cells) {
  // add columns
  for (const array of cells) {
    array.push(0);
    array.unshift(0);
  }
  // add rows
  let fillerRow = new Array(cells[0].length).fill(0);
  cells.unshift(fillerRow);
  cells.push(fillerRow);
}

function getNeighbors(cells) {
  let neighbors = [];

  for (let i = 0; i < cells.length; i++) {
    let array = [];
    // determine valid directions for neighbors
    for (let j = 0; j < cells[i].length; j++) {
      let up = i < 1 ? i : i - 1;
      let down = i > cells.length - 2 ? i : i + 1;
      let left = j < 1 ? j : j - 1;
      let right = j > cells[i].length - 2 ? j : j + 1;
      let live = 0;
      // calculate number of live neighbors
      for (let k = up; k <= down; k++) {
        for (let l = left; l <= right; l++) {
          live += cells[k][l];
        }
      }
      // remove self
      array.push(live - cells[i][j]);
    }
    neighbors.push(array);
  }
  return neighbors;
}

function getNextgen(cells, neighbors) {
  let nextgen = [];

  for (let i = 0; i < cells.length; i++) {
      let array = [];
      for (let j = 0; j < cells[i].length; j++) {
        let value = 0;
        // determine if cell should be live
        if (cells[i][j] === 1) {
          if (neighbors[i][j] >= 2 && neighbors[i][j] <= 3) {
            value = 1;
          }
        } else if (neighbors[i][j] === 3) {
          value = 1;
        }
        array.push(value);
      }
      nextgen.push(array);
    }
  return nextgen;
}

function crop(cells) {
  /*  In a grid with (0,0) as top left:
        leftmost: x val closest to 0
        rightmost: x val furthest from 0
        uppermost: y val closest to 0
        lowermost: y val furthest from 0  */
  let leftmost = cells[0].length;
  let rightmost = 0;
  let uppermost = cells.length;
  let lowermost = 0;

  for (let i = 0; i < cells.length; i++) {
    for (let j = 0; j < cells[i].length; j++) {
      if (cells[i][j] == 1) {
        if (i < uppermost)
            uppermost = i;
        if (i > lowermost)
            lowermost = i;
        if (j < leftmost)
            leftmost = j;
        if (j > rightmost)
            rightmost = j;
      }
    }
  }

  let cropped = [];
    for (let i = uppermost; i <= lowermost; i++) {
      cropped.push(cells[i].slice(leftmost, rightmost + 1));
    }

  return cropped;
}
