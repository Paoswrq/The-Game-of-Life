const grid = document.getElementById("grid");
let intervalId;

document.addEventListener('DOMContentLoaded', () => {
    createGrid();
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            toggleAutoUpdate();
        }
    });
});

function createGrid() {
    for (let i = 0; i < 3650; i++) {
        const cell = document.createElement('div');
        cell.className = 'grid-item';

        cell.addEventListener('click', function() {
            if (cell.style.backgroundColor === 'black') {
                cell.style.backgroundColor = 'white';
            } else {
                cell.style.backgroundColor = 'black';
            }
        });
        grid.appendChild(cell);
    }
}

function countLiveNeighbors(index, gridWidth) {
    let liveNeighbors = 0;
    const row = Math.floor(index / gridWidth);
    const col = index % gridWidth;

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;  
            const neighborRow = row + i;
            const neighborCol = col + j;

            if (neighborRow >= 0 && neighborRow < Math.floor(grid.children.length / gridWidth) &&
                neighborCol >= 0 && neighborCol < gridWidth) {
                
                const neighborIndex = neighborRow * gridWidth + neighborCol;
                const neighborCell = grid.children[neighborIndex];
                
                if (neighborCell.style.backgroundColor === 'black') {
                    liveNeighbors++;
                }
            }
        }
    }
    return liveNeighbors;
}

function updateGrid() {
    const gridWidth = 73; 
    const newGridState = [];
    let changed = false;

    for (let i = 0; i < grid.children.length; i++) {
        const cell = grid.children[i];
        const liveNeighbors = countLiveNeighbors(i, gridWidth);
        const isAlive = cell.style.backgroundColor === 'black';

        if (isAlive) {
            if (liveNeighbors < 2 || liveNeighbors > 3) {
                newGridState[i] = 'dead'; 
                changed = true;
            } else {
                newGridState[i] = 'alive';  
            }
        } else {
            if (liveNeighbors === 3) {
                newGridState[i] = 'alive';
                changed = true;
            } else {
                newGridState[i] = 'dead';  
            }
        }
    }

    for (let i = 0; i < grid.children.length; i++) {
        const cell = grid.children[i];
        if (newGridState[i] === 'alive') {
            cell.style.backgroundColor = 'black'; 
        } else {
            cell.style.backgroundColor = 'white'; 
        }
    }

    return changed;
}


function toggleAutoUpdate() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    } else {
        intervalId = setInterval(updateGrid, 400);
    }
}