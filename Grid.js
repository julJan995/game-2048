const GRID_SIZE = 4;
const CELL_SIZE = 20;
const CELL_GAP = 2;

export default class Grid {
    //private variables
    #cells

    constructor(gridElement) {
        gridElement.style.setProperty("--grid-size", GRID_SIZE);
        gridElement.style.setProperty("--cell-size", `${CELL_SIZE}vmin`);
        gridElement.style.setProperty("--cell-gap", `${CELL_GAP}vmin`);
        this.#cells = createCellElements(gridElement)
            .map((el, index) => {
                return new Cell(
                    el, 
                    index % GRID_SIZE, 
                    Math.floor(index / GRID_SIZE)
                );
            })
  }

  get #emptyCells() {
      return this.#cells.filter(cell => cell.tile == null)
  }

  randomEmptyCell() {
    const randomIndex = Math.floor(Math.random() * this.#emptyCells.length)
    return this.#emptyCells[randomIndex]
  }
}

class Cell {
    //cannot be modified outside the class
    #cellElement
    #x
    #y
    #tile

    constructor(cellElement, x, y) {
        this.#cellElement = cellElement;
        this.#x = x;
        this.#y = y;
    }

    get tile() {
        return this.#tile;
    }

    set tile(value) {
        this.#tile = value;
        if (value == null) {
            return;
        } else {
            this.#tile.x = this.#x;
            this.#tile.y = this.#y;
        }
    }
}

const createCellElements = (gridElement) => {
    const cells = [];
    for (let i = 0; i < Math.pow(GRID_SIZE, 2); i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        //adding to the array
        cells.push(cell);
        //adding to the page
        gridElement.append(cell);
    }
        return cells;
}