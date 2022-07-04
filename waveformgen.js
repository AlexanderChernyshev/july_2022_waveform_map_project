class Tile {
    constructor(id, image) {
        this.id = id;
        this.image = image;
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
    for (let row = 0; row < map.length; row++) {
        const rowEl = document.createElement("div");
        rowEl.classList.add("row")
        for (let cell = 0; cell < map[row].length; cell++) {
            const imageEl = document.createElement("img");
            const tileId = map[row][cell];
            imageEl.setAttribute("src", `tiles/${tiles[tileId].image}`);
            rowEl.appendChild(imageEl);
        }
        output.appendChild(rowEl);
    }
}

generateMap(example_map);
generateMap(example_map);