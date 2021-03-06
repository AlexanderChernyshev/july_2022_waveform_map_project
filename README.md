# Mapgen

This project is an exercise in creating a wave function collapse algorithm. It will generate 2D maps made of tiles I drew of varying sizes.

## Steps
- [x] tiles, sample maps, and create html and css.
- [x] a function to train a tileset, then refactor it to be a method of a tileset class.
- [x] new map for training, make unresolved tile option and display on map for it, add css grid styling to page so that tiles can auto distribute and the unresolved tiles can display possible options for tiles to be assigned.
- [x] function to grow maps of different sizes, then refactor to a map class with a method for growing a map and a method for displaying the resulting map. modify styling to keep multiple maps separate.
- [x] a method of the map class that resolves one tile
- [ ] a method that resolves an entire map
    - [x] look for cell that contains the lowest amount of possibilities (entropy).
    - [x] collapse that tile. `collapseCell()`.
    - [ ] propagate consequences of previous collapse to surrounding tiles based on tile restricitons.
    - [ ] repeat propagation until entire map has propagated.
    - [ ] repeat from first step until no uncollapsed cells remain.
- [ ] limit maps on the webpage to one, add ui to page that allows you to select map size and a "generate" button.
- [ ] animate the process of drawing the map on the webpage.
- [ ] add a tileset selection button.
- [ ] add a way to upload tilesets and algorithm training maps.
