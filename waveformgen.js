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
                let currentId = map[rowIndex][cellIndex].tileId;
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
        else {
            /* @TODO populate the list of options */
            this.resolved = false;
        }

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
    [new Cell("sky"), new Cell("sky"), new Cell("sky"), new Cell("sky"), new Cell("sky"), new Cell("sky"), new Cell("clouds"), new Cell("sky"), new Cell("sky"), new Cell("sky"), new Cell("sky")],
    [new Cell("sky"), new Cell("sky"), new Cell("clouds"), new Cell("sky"), new Cell("column"), new Cell("sky"), new Cell("sky"), new Cell("sky"), new Cell("clouds"), new Cell("sky"), new Cell("sky")],
    [new Cell("clouds"), new Cell("sky"), new Cell("sky"), new Cell("leftstairs"), new Cell("block"), new Cell("rightstairs"), new Cell("sky"), new Cell("sky"), new Cell("sky"), new Cell("leftsmallslope"), new Cell("potslab")],
    [new Cell("sky"), new Cell("sky"), new Cell("leftslope"), new Cell("block"), new Cell("ornatewindow"), new Cell("block"), new Cell("rightstairs"), new Cell("sky"), new Cell("leftslope"), new Cell("block"), new Cell("windows")],
    [new Cell("slab"), new Cell("leftbigstep"), new Cell("windows"), new Cell("block"), new Cell("block"), new Cell("block"), new Cell("windows"), new Cell("block"), new Cell("block"), new Cell("block"), new Cell("block")]
];

let example_map_2 = [
    [new Cell("sky"), new Cell("sky"), new Cell("sky"), new Cell("sky"), new Cell("clouds"), new Cell("sky"), new Cell("sky"), new Cell("sky")],
    [new Cell("sky"), new Cell("sky"), new Cell("clouds"), new Cell("sky"), new Cell("sky"), new Cell("sky"), new Cell("clouds"), new Cell("sky")],
    [new Cell("sky"), new Cell("sky"), new Cell("sky"), new Cell("sky"), new Cell("sky"), new Cell("sky"), new Cell("sky"), new Cell("sky"),],
    [new Cell("sky"), new Cell("clouds"), new Cell("column"), new Cell("column"), new Cell("column"), new Cell("clouds"), new Cell("sky"), new Cell("sky")],
    [new Cell("sky"), new Cell("leftstairs"), new Cell("windows"), new Cell("block"), new Cell("windows"), new Cell("block"), new Cell("rightslope"), new Cell("clouds")],
    [new Cell("block"), new Cell("windows"), new Cell("windows"), new Cell("ornatewindow"), new Cell("windows"), new Cell("windows"), new Cell("windows"), new Cell("rightslope")]
];
let example_map_3 = [
    [new Cell("sky"), new Cell(), new Cell()],
    [new Cell("sky"), new Cell("sky"), new Cell("clouds")],
    [new Cell(), new Cell("sky"), new Cell("sky")],
];

function generateMap(map) {
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
                rowEl.appendChild(divEl);
            }
        }
        output.appendChild(rowEl);
    }
}

tileset.train(example_map);
tileset.train(example_map_2);
generateMap(example_map_3);


