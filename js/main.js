function createGrid(dimension) {
    const grid = document.querySelector('.grid');
    for (let i = 0; i < dimension; i++) {
        const gridRow = document.createElement('div')
        gridRow.classList.add('grid-row')
        for (let i = 0; i < dimension; i++) {
            const square = document.createElement('div')
            square.classList.add('square');
            gridRow.appendChild(square);
        }
        grid.appendChild(gridRow);
    }
}

function colorSquareBlack(e) {
    e.target.style.backgroundColor = 'black';
}

function colorBlack() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => square.removeEventListener('mouseover', colorSquareRainbow));
    squares.forEach(square => square.addEventListener('mouseover', colorSquareBlack));
}

function colorRainbow() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => square.removeEventListener('mouseover', colorSquareBlack));
    squares.forEach(square => square.addEventListener('mouseover', colorSquareRainbow));
}

function colorSquareRainbow(e) {
    e.target.style.backgroundColor = generateRandomColor();
}

function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

function switchColor(e) {
    if (e.target.textContent === 'COLOR') {
        colorRainbow();
        e.target.textContent = 'BLACK';
    }
    else {
        colorBlack();
        e.target.textContent = 'COLOR';
    }
}

function resetGrid(e) {
    deleteGrid();
    const newGridDimension = parseInt(prompt('Please enter a new grid dimension between 10 and 100 inclusive.'));
    if (newGridDimension >= 10 && newGridDimension <= 100) {
        colorGrid(newGridDimension);
    }
    else {
        alert('Invalid grid dimension.');
        resetGrid(e);
    }
}

function deleteGrid() {
    const grid = document.querySelector('.grid');
    while (grid.firstChild) {
        grid.removeChild(grid.lastChild);
    }
}

function colorGrid(dimension) {
    deleteGrid();
    createGrid(dimension);
    colorBlack();

    const clearButton = document.querySelector('.clear-button');
    clearButton.addEventListener('click', resetGrid);

    const colorButton = document.querySelector('.color-button');
    colorButton.addEventListener('click', switchColor);
}

colorGrid(16);