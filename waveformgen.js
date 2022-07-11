class Tile {
    constructor(id, image) {
        this.id = id;
        this.image = image;
        this.north = [];
        this.west = [];
        this.east = [];
        this.south = [];
    }
}

class Tileset {
    constructor() {
        this.tiles = {}
    }

    add(tile) {
        this.tiles[tile.id] = tile;
    }

    train(map) {

        for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {

            for (let cellIndex = 0; cellIndex < map[rowIndex].length; cellIndex++) {
                const currentcell = map[rowIndex][cellIndex];
                if (!currentcell.resolved) {
                    continue;
                }
                let currentId = currentcell.tileId;
                let currenttile = this.tiles[currentId];

                if (rowIndex > 0) {
                    let northId = map[rowIndex - 1][cellIndex].tileId;
                    currenttile.north.push(northId);
                }

                if (cellIndex > 0) {
                    let westId = map[rowIndex][cellIndex - 1].tileId;
                    currenttile.west.push(westId);
                }

                if (cellIndex < map[rowIndex].length - 1) {
                    let eastId = map[rowIndex][cellIndex + 1].tileId;
                    currenttile.east.push(eastId);
                }

                if (rowIndex < map.length - 1) {
                    let southId = map[rowIndex + 1][cellIndex].tileId;
                    currenttile.south.push(southId);
                }

            }

        }

    }

}
class Cell {
    constructor(input) {
        if (typeof input == "string") {
            this.resolved = true;
            this.tileId = input;
        }
        else if (typeof input == "object") {
            /* @TODO populate the list of options */
            this.resolved = false;
            this.options = Object.keys(input.tiles)

        }
        else {
            throw "Unsupported Parameter in the Cell"
        }

    }
    resolve() {
        const randomIndex = Math.floor(Math.random() * (this.options.length))
        this.tileId = this.options[randomIndex];
        this.resolved = true;
    }
}

class Worldmap {
    constructor(numxtiles, numytiles, tileset) {

        let outputmap = [];

        for (let y = 0; y < numytiles; y++) {
            let rowarray = [];
            outputmap.push(rowarray);
            for (let x = 0; x < numxtiles; x++) {
                rowarray.push(new Cell(tileset));
            }
        }
        this.cells = outputmap;
    }

    display() {
        let map = this.cells;
        const mapEl = document.createElement("div");
        mapEl.setAttribute("class", "map");
        const output = document.getElementById("generated-map");
        for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
            const rowEl = document.createElement("div");
            rowEl.classList.add("row")
            for (let cellIndex = 0; cellIndex < map[rowIndex].length; cellIndex++) {
                const cell = map[rowIndex][cellIndex];
                if (cell.resolved) {
                    const imageEl = document.createElement("img");
                    const tileId = cell.tileId;
                    imageEl.setAttribute("src", `tiles/${tileset.tiles[tileId].image}`);
                    rowEl.appendChild(imageEl);
                }
                else {
                    const divEl = document.createElement("div");
                    divEl.setAttribute("class", "blank")
                    cell.options.forEach(
                        tileId => {
                            const iconEl = document.createElement("img");
                            iconEl.setAttribute("src", `tiles/${tileset.tiles[tileId].image}`);
                            divEl.appendChild(iconEl);
                        }
                    )
                    rowEl.appendChild(divEl);
                }
            }
            mapEl.appendChild(rowEl);
        }
        output.appendChild(mapEl);
    }
    resolvecell(cellX, cellY) {
        const selectedCell = this.cells[cellY][cellX];
        selectedCell.resolve();
        this.wave(cellX, cellY);
    }
    wave(cellX, cellY) {
        const collapseQueue = [];
        const processedCoordinates = [];
        if (cellY > 0 && !this.cells[cellY - 1][cellX].resolved) {
            collapseQueue.push([cellX, cellY - 1]);
        }
        if (cellY < (this.cells.length - 1) && !this.cells[cellY + 1][cellX].resolved) {
            collapseQueue.push([cellX, cellY + 1]);
        }
        if (cellX > 0 && !this.cells[cellY][cellX - 1].resolved) {
            collapseQueue.push([cellX - 1, cellY]);
        }
        if (cellX < (this.cells[cellY].length - 1) && !this.cells[cellY][cellX + 1].resolved) {
            collapseQueue.push([cellX + 1, cellY]);
        }
        while (collapseQueue.length > 0) {
            const coordinates = collapseQueue.shift();
            if (this.collapse(coordinates[0], coordinates[1])) {
                if (coordinates[1] > 0 &&
                    !this.cells[coordinates[1] - 1][coordinates[0]].resolved &&
                    !processedCoordinates.find(pair => {
                        if (pair[0] === coordinates[0] && pair[1] === (coordinates[1] - 1)) {
                            return true;
                        } else {
                            return false;
                        }
                    })
                ) {
                    collapseQueue.push([coordinates[0], coordinates[1] - 1]);
                }
                if (coordinates[1] < (this.cells.length - 1) &&
                    !this.cells[coordinates[1] + 1][coordinates[0]].resolved &&
                    !processedCoordinates.find(pair => {
                        if (pair[0] === coordinates[0] && pair[1] === (coordinates[1] + 1)) {
                            return true;
                        } else {
                            return false;
                        }
                    })
                ) {
                    collapseQueue.push([coordinates[0], coordinates[1] + 1]);
                }
                if (coordinates[0] > 0 &&
                    !this.cells[coordinates[1]][coordinates[0] - 1].resolved &&
                    !processedCoordinates.find(pair => {
                        if (pair[0] === (coordinates[0] - 1) && pair[1] === coordinates[1]) {
                            return true;
                        } else {
                            return false;
                        }
                    })
                ) {
                    collapseQueue.push([coordinates[0] - 1, coordinates[1]]);
                }
                if (coordinates[0] < (this.cells[coordinates[1]].length - 1) &&
                    !this.cells[coordinates[1]][coordinates[0] + 1].resolved &&
                    !processedCoordinates.find(pair => {
                        if (pair[0] === (coordinates[0] + 1) && pair[1] === coordinates[1]) {
                            return true;
                        } else {
                            return false;
                        }
                    })
                ) {
                    collapseQueue.push([coordinates[0] + 1, coordinates[1]]);
                }
            };
            processedCoordinates.push(coordinates);
        }
    }
    /**
     * reduce possilbe tileids of cell based on neighbors. returns true if the possibilities of cell changed.
     * @param {int} cellX 
     * @param {int} cellY 
     * @returns boolean
     */
    collapse(cellX, cellY) {
        console.log(`trying to collapse ${cellX} ${cellY}`);
        return true;
    }
}

const tileset = new Tileset();

tileset.add(new Tile("leftbigstep", "leftbigsteptile.png"));
tileset.add(new Tile("rightbigstep", "rightbigsteptile.png"));
tileset.add(new Tile("block", "blocktile.png"));
tileset.add(new Tile("clouds", "cloudstile.png"));
tileset.add(new Tile("column", "columntile.png"));
tileset.add(new Tile("ornatewindow", "ornatewindowtile.png"));
tileset.add(new Tile("potslab", "potslabtile.png"));
tileset.add(new Tile("sky", "skytile.png"));
tileset.add(new Tile("slab", "slabtile.png"));
tileset.add(new Tile("leftslope", "leftslopetile.png"));
tileset.add(new Tile("rightslope", "rightslopetile.png"));
tileset.add(new Tile("leftsmallslope", "leftsmallslopetile.png"));
tileset.add(new Tile("rightsmallslope", "rightsmallslopetile.png"));
tileset.add(new Tile("leftstairs", "leftstairstile.png"));
tileset.add(new Tile("rightstairs", "rightstairstile.png"));
tileset.add(new Tile("windows", "windowstile.png"));

let example_map = [
    [new Cell("sky"), new Cell(tileset), new Cell("sky"), new Cell("sky"), new Cell("sky"), new Cell("sky"), new Cell("clouds"), new Cell("sky"), new Cell("sky"), new Cell("sky"), new Cell("sky")],
    [new Cell("sky"), new Cell("sky"), new Cell("clouds"), new Cell("sky"), new Cell("column"), new Cell("sky"), new Cell("sky"), new Cell("sky"), new Cell("clouds"), new Cell("sky"), new Cell("sky")],
    [new Cell("clouds"), new Cell("sky"), new Cell("sky"), new Cell("leftstairs"), new Cell("block"), new Cell("rightstairs"), new Cell("sky"), new Cell("sky"), new Cell("sky"), new Cell("leftsmallslope"), new Cell("potslab")],
    [new Cell("sky"), new Cell("sky"), new Cell("leftslope"), new Cell("block"), new Cell("ornatewindow"), new Cell("block"), new Cell("rightstairs"), new Cell("sky"), new Cell("leftslope"), new Cell("block"), new Cell("windows")],
    [new Cell("slab"), new Cell("leftbigstep"), new Cell("windows"), new Cell("block"), new Cell("block"), new Cell("block"), new Cell("windows"), new Cell("block"), new Cell("block"), new Cell("block"), new Cell("block")]
];

let example_map_2 = [
    [new Cell("sky"), new Cell("sky"), new Cell("sky"), new Cell("sky"), new Cell("clouds"), new Cell("sky"), new Cell("sky"), new Cell("sky")],
    [new Cell("sky"), new Cell("sky"), new Cell("clouds"), new Cell("sky"), new Cell("sky"), new Cell("sky"), new Cell("clouds"), new Cell("sky")],
    [new Cell("sky"), new Cell("sky"), new Cell("sky"), new Cell("sky"), new Cell("sky"), new Cell("sky"), new Cell("sky"), new Cell("sky"),],
    [new Cell("sky"), new Cell(tileset), new Cell("column"), new Cell("column"), new Cell("column"), new Cell("clouds"), new Cell("sky"), new Cell("sky")],
    [new Cell("sky"), new Cell("leftstairs"), new Cell("windows"), new Cell("block"), new Cell("windows"), new Cell("block"), new Cell("rightslope"), new Cell("clouds")],
    [new Cell("block"), new Cell("windows"), new Cell("windows"), new Cell("ornatewindow"), new Cell("windows"), new Cell("windows"), new Cell("windows"), new Cell("rightslope")]
];
let example_map_3 = [
    [new Cell("sky"), new Cell(tileset), new Cell(tileset)],
    [new Cell("sky"), new Cell("sky"), new Cell("clouds")],
    [new Cell(tileset), new Cell("sky"), new Cell("sky")],
];

let unresolved_map = new Worldmap(8, 7, tileset);
let unresolved_map_2 = new Worldmap(3, 2, tileset);

tileset.train(example_map);
tileset.train(example_map_2);
unresolved_map.resolvecell(5, 5);
unresolved_map.display();
