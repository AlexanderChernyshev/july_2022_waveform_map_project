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

const tiles = {
    leftbigstep: new Tile("leftbigstep", "leftbigsteptile.png"),
    rightbigstep: new Tile("rightbigstep", "rightbigsteptile.png"),
    block: new Tile("block", "blocktile.png"),
    clouds: new Tile("clouds", "cloudstile.png"),
    column: new Tile("column", "columntile.png"),
    ornatewindow: new Tile("ornatewindow", "ornatewindowtile.png"),
    potslab: new Tile("potslab", "potslabtile.png"),
    sky: new Tile("sky", "skytile.png"),
    slab: new Tile("slab", "slabtile.png"),
    leftslope: new Tile("leftslope", "leftslopetile.png"),
    rightslope: new Tile("rightslope", "rightslopetile.png"),
    leftsmallslope: new Tile("leftsmallslope", "leftsmallslopetile.png"),
    rightsmallslope: new Tile("rightsmallslope", "rightsmallslopetile.png"),
    leftstairs: new Tile("leftstairs", "leftstairstile.png"),
    rightstairs: new Tile("rightstairs", "rightstairstile.png"),
    windows: new Tile("windows", "windowstile.png"),
};

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
            imageEl.setAttribute("src", `tiles/${tiles[tileId].image}`);
            rowEl.appendChild(imageEl);
        }
        output.appendChild(rowEl);
    }
}

function trainTileSet(map, tiles) {

    for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {

        for (let cellIndex = 0; cellIndex < map[rowIndex].length; cellIndex++) {
            let currentId = map[rowIndex][cellIndex];
            let currenttile = tiles[currentId];

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



trainTileSet(example_map, tiles);
generateMap(example_map);

console.log(tiles);