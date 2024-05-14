var getMaximumGold = function (grid) {
  // Use flag to keep track of cell availability
  const isAvailable = grid.map(row => row.map((cell) => cell !== 0));

  let max = 0;
  let sum = 0;
  let maxPath = [];

  // Recursion to explore paths and update maxPath
  const walk = (i, j, currentPath) => {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || !isAvailable[i][j]) return;

    // Add current cell to path
    currentPath.push([i, j]);

    const currentGold = grid[i][j];
    sum += currentGold;

    if (sum === max && currentPath.length > maxPath.length) { // Update maxPath only for same or higher gold with longer path
      maxPath = [...currentPath];
    } else if (sum > max) {
      max = sum;
      maxPath = [...currentPath];
    }

    // Update availability
    isAvailable[i][j] = false;

    // Explore around
    walk(i - 1, j, [...currentPath]);
    walk(i + 1, j, [...currentPath]);
    walk(i, j + 1, [...currentPath]);
    walk(i, j - 1, [...currentPath]);

    // Update on backtracking
    sum -= currentGold;
    isAvailable[i][j] = true;
    currentPath.pop();
  };

  // Start on all possible gold cells
  grid.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell > 0) {
        walk(i, j, []);
      }
    });
  });

  return { maxGold: max, path: maxPath };
};

const grid = [[0, 6, 0], [5, 8, 7], [0, 9, 0]];
const result = getMaximumGold(grid);

const maxGold = result.maxGold;
const path = result.path.map(cell => `[${ grid[cell[0]][cell[1]]}]`).join(' -> ');  // Format path coordinates

const explanation = `Following the path ${path} achieves the maximum gold of ${maxGold}.`;
console.log("Output:", maxGold);
console.log(explanation);
