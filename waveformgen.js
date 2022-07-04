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
                let currentId = map[rowIndex][cellIndex];
                let currenttile = this.tiles[currentId];

                if (rowIndex > 0) {
                    let northId = map[rowIndex - 1][cellIndex];
                    currenttile.north.push(northId);
                }

                if (cellIndex > 0) {
                    let westId = map[rowIndex][cellIndex - 1];
                    currenttile.west.push(westId);
                }

                if (cellIndex < map[rowIndex].length - 1) {
                    let eastId = map[rowIndex][cellIndex + 1];
                    currenttile.east.push(eastId);
                }

                if (rowIndex < map.length - 1) {
                    let southId = map[rowIndex + 1][cellIndex];
                    currenttile.south.push(southId);
                }

            }

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
    ["sky", "sky", "sky", "sky", "sky", "sky", "clouds", "sky", "sky", "sky", "sky"],
    ["sky", "sky", "clouds", "sky", "column", "sky", "sky", "sky", "clouds", "sky", "sky"],
    ["clouds", "sky", "sky", "leftstairs", "block", "rightstairs", "sky", "sky", "sky", "leftsmallslope", "potslab"],
    ["sky", "sky", "leftslope", "block", "ornatewindow", "block", "rightstairs", "sky", "leftslope", "block", "windows"],
    ["slab", "leftbigstep", "windows", "block", "block", "block", "windows", "block", "block", "block", "block"]
];

function generateMap(map) {
    const output = document.getElementById("generated-map");
    for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
        const rowEl = document.createElement("div");
        rowEl.classList.add("row")
        for (let cellIndex = 0; cellIndex < map[rowIndex].length; cellIndex++) {
            const imageEl = document.createElement("img");
            const tileId = map[rowIndex][cellIndex];
            imageEl.setAttribute("src", `tiles/${tileset.tiles[tileId].image}`);
            rowEl.appendChild(imageEl);
        }
        output.appendChild(rowEl);
    }
}



tileset.train(example_map);
generateMap(example_map);

console.log(tileset);